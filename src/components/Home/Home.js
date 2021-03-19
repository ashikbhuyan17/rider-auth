import React, { useState } from 'react';
import fakeData from '../../fakeData.json'
import Rider from '../Rider/Rider';
const Home = () => {
    const [data, setData] = useState(fakeData)
    console.log(data);
    return (
        <div>
            <h1>this is home page</h1>

            {
                data.map(data => <Rider data={data}></Rider>)
            }

        </div>
    );
};

export default Home;