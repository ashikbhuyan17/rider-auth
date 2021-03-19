import { useParams } from 'react-router';
import fakeData from '../../fakeData.json'
import React, { useState } from 'react';

const Destination = () => {
    const [search, setSearch] = useState(false)

    const { id } = useParams()
    console.log(id)
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
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14529.920850985389!2d90.77410692216641!3d24.434119184081982!2m3!1f0!2f0!3f0!3m2!
        1i1024!2i768!4f13.1!3m3!1m2!1s0x3756918773180af5%3A0x530a9427210ef003!2sKishoreganj!5e0!3m2!1sen!2sbd!4v1616183548045!5m2!1sen!2sbd"
                    width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
            </div>

            { id ? search ? <div>
                <h5>{a.name} </h5>
                <img src={a.photo} alt="" width="200px" />
            </div> :
                <div>
                    <form action="">
                        <input type="text" name="" placeholder="london" /><br /><br />
                        <input type="text" name="" placeholder="Dhaka" /> <br /><br />
                        <button onClick={handleSearch}>Search</button>

                    </form>
                </div> :
                search ? <div>
                    <h5>name : ashik</h5>

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

export default Destination;