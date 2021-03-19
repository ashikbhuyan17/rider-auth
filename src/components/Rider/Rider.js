import React from 'react';
import { useHistory } from 'react-router';


const Rider = (props) => {
    const { name, photo, id } = props.data
    let history = useHistory();
    function handleClick() {
        console.log("success");
        history.push(`/riderDetails/${id}`);
    }
    return (
        <div>
            <div onClick={handleClick} style={{ width: '500px' }}>
                <h1>{name}</h1>
                <img src={photo} alt="" width="150px" />
            </div>
        </div>
    );
};

export default Rider;