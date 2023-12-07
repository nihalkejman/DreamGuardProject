import { createContext, useContext, useState, useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { useBLEContext } from "./BLEContext";
import { sendSMS } from "./SMS";

const BikeBoxContext = createContext(undefined);

export const useBikeBoxContext = () => {
    const val = useContext(BikeBoxContext);

    if (!val) {
        throw new Error("BikeBox context used outside of provider!");
    }
    return val;
}

const BikeBoxProvider = ({ children }) => {

    /**
     * Notifications stuff
     */
    // const [expoPushToken, setExpoPushToken] = useState("");

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                sound: true,
                lightColor: "#FF231F7C",
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                bypassDnd: true,
            });
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            })
        });
    }, []);

    /**
     * Speed states
     */
    const { getSpeed, getEmergencyContact, connectedDevice, getUserName, isConnecting } = useBLEContext();
    const [speed, setSpeed] = useState(0);

    /**
     * Get speed every 500ms
    */
    const prevSpeed = useRef(0);

    useEffect(() => {
        if (!connectedDevice || isConnecting) return;

        let timeout;

        const fn = async () => {
            const val = await getSpeed();
            if (val) {
                setSpeed(Number(val).toFixed(1));
            }
            timeout = setTimeout(fn, 500);
        }
        fn();
        return () => clearTimeout(timeout);
    }, [connectedDevice, isConnecting]);

    /**
     * Lock, sms states
     */
    const [isLocked, setIsLocked] = useState(false);
    const [hasSMSSent, setHasSMSSent] = useState(false);
    const [hasNotiSent, setHasNotiSent] = useState(false);

    useEffect(() => {
        // Reset states when connection resets
        setIsLocked(false);
        setHasSMSSent(false);
        setHasNotiSent(false);
    }, [connectedDevice])

    const send = async () => {
        const { emc_phone, emc_msg } = await getEmergencyContact();
        const name = await getUserName();

        if (hasSMSSent || !emc_msg || !emc_phone) return;
        sendSMS(emc_phone, emc_msg, name);
    }
    // Compare previous speed and current speed to send crash SMS
    useEffect(() => {
        if (hasSMSSent) return;

        if (prevSpeed.current > 15 && speed < 5 && speed > 0) {
            setHasSMSSent(true);
            send();
        }
        prevSpeed.current = speed;
    }, [speed, hasSMSSent]);

    const toggleLock = () => {
        setIsLocked(p => !p);
    }

    // Check current speed while locked, to send notification
    useEffect(() => {
        if (hasNotiSent) return;

        if (isLocked && speed > 5) {
            setHasNotiSent(true);
            Notifications.scheduleNotificationAsync({
                trigger: {
                    seconds: 1
                },
                content: {
                    title: 'BikeBox Alarm',
                    body: 'Bike movement detected while locked!',
                    sound: true
                }
            });
        }
    }, [speed, isLocked, hasNotiSent]);

    return (
        <BikeBoxContext.Provider value={{
            toggleLock,
            isLocked,
            speed
        }}>
            {children}
        </BikeBoxContext.Provider>
    );
};

export default BikeBoxProvider;
