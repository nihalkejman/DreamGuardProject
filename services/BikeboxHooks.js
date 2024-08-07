import { useEffect, useState } from "react";
import { useBLEContext } from "./BLEContext";
import { useBikeBoxContext } from "./BikeBoxContext";

export function useCurrentSpeed() {
    const { speed } = useBikeBoxContext();
    return speed;
}

/**
 * Average and top speeds don't need to be tracked when not on home screen.
 * So, they can stay in hooks instead of global context
 */
export function useAverageSpeed() {
    const { getAverageSpeed } = useBLEContext();
    const [ speed, setSpeed ] = useState(0);

    useEffect(() => {
        let timeout;

        const fn = async() => {
            const val = await getAverageSpeed();
            if (val) setSpeed(Number(val).toFixed(1));

            timeout = setTimeout(fn, 1000);
        }
        fn();

        return () => clearTimeout(timeout);
    }, []);

    return speed;
}

export function useTopSpeed() {
    const { getTopSpeed } = useBLEContext();
    const [ speed, setSpeed ] = useState(0);

    useEffect(() => {
        let timeout;

        const fn = async() => {
            const val = await getTopSpeed();
            if (val) setSpeed(Number(val).toFixed(1));

            timeout = setTimeout(fn, 1000);
        }
        fn();

        return () => clearTimeout(timeout);
    }, []);

    return speed;
}

export function useSessionStatus() {
    const { getSessionStatus, setSessionStatus } = useBLEContext();
    const [ status, setStatus ] = useState(false);
    const [ startTime, setStartTime ] = useState(0);

    useEffect(() => {
        if (status) {
            setStartTime(new Date().valueOf());
            const interval = setInterval(() => {
                setStartTime(p => p+1)
            }, 1000 * 5);
            
            return () => clearInterval(interval);
        }
        else {
            setStartTime(0);
        }
    }, [ status ])

    const refreshStatus = async() => {
        const val = await getSessionStatus();
        setStatus(String(val) === '1');
    }
    const toggleStatus = async() => {
        await setSessionStatus(!status);
        await refreshStatus();
    }

    const getRideTime = () => {
        if (startTime === 0) return 0;
        const dur = new Date().valueOf() - startTime;
        return (dur / 1000 / 60).toFixed(1);
    }

    useEffect(() => {
        refreshStatus();
    }, [])

    return { status, toggleStatus, getRideTime };
}

export function useTotalRideTime() {
    const { getTotalRideTime } = useBLEContext();
    const { status } = useSessionStatus();
    const [ value, setValue ] = useState(0);

    useEffect(() => {
        (async() => {
            const val = await getTotalRideTime();
            setValue(val);
        })();
    }, [ status ]);

    return (Number(value) / 60).toFixed(1);
}

export function useTotalAverageSpeed() {
    const { getTotalAverageSpeed } = useBLEContext();
    const { status } = useSessionStatus();
    const [ value, setValue ] = useState(0);

    useEffect(() => {
        (async() => {
            const val = await getTotalAverageSpeed();
            setValue(val);
        })();
    }, [ status ]);

    return Number(value).toFixed(1);
}

export function useSessions() {
    const { getSessions } = useBLEContext();
    const [ sessions, setSessions ] = useState([]);

    useEffect(() => {
        (async() => {
            const list = await getSessions();
            
            const arr = Object.entries(list).map(([ id, session ]) => {
                return {
                    ...session,
                    id
                }
            }).sort((a, b) => b.id - a.id);

            setSessions(arr);
        })();
    }, []);

    return sessions;
}
