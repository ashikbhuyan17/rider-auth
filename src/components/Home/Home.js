import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData.json'
import Rider from '../Rider/Rider';
const Home = () => {
    const [data, setData] = useState([])
    console.log(data);
    useEffect(() => {
        setData(fakeData)
    }, [])
    return (
        <div
            style={{ width: "80%", margin: "0 auto" }}
            className="row ride-container"
        >
            {data.map((data) => (
                <Rider data={data}></Rider>
            ))}
        </div>
    );
};

export default Home;