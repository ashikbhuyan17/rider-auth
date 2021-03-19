import React, { useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData.json'

const RiderDetails = () => {
    const [search, setSearch] = useState(false)

    const { id } = useParams()
    const [data, setData] = useState(fakeData)
    console.log(data);
    const a = data.find(data => data.id == id)
    console.log(a);


    const handleSearch = () => {
        setSearch(true)
    }


    return (
        <div>
            <h2>this is rider section {id}</h2>

            { search ? <div>
                <h5>{a.name} </h5>
                <img src={a.photo} alt="" width="200px" />
            </div> :
                <div>
                    <form action="">
                        <input type="text" name="" placeholder="london" /><br /><br />
                        <input type="text" name="" placeholder="Dhaka" /> <br /><br />
                        <button onClick={handleSearch}>Search</button>

                    </form>
                </div>
            }
        </div>
    );
};

export default RiderDetails;