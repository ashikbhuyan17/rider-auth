import React from 'react';
import { useHistory } from 'react-router';
import './Rider.css'
const Rider = (props) => {
    const { name, photo, id } = props.data
    let history = useHistory();
    function handleClick() {
        console.log("success");
        history.push(`/destination/${id}`);
    }
    return (
        <div className="col-md-3 ride-card">
            <div
                class="card container "
                style={{ width: "15rem" }}
                onClick={handleClick}
            >
                <img src={photo} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <h2 class="card-text">{name} </h2>
                </div>
            </div>
        </div>
    );
};

export default Rider;
