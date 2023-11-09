import React from 'react';
import './test.css';    //style file

const YourComponent = () => {
    const data = [1,2,3];   //data array

    return(
        <div className='container'>
            {data.map((item, index)=>(
                <div key={index} className='box'>
                    {/*display data here*/}
                    {item}
                    </div>
            ))}
        </div>
    );
};

export default YourComponent;