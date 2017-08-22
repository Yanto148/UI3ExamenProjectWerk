import React from 'react';
import { Link } from 'react-router';

function PlattegrondView(props)
{
    return(
        <div className="App">
            <p style={props.buttonStyle}><button onClick={(e) => props.switchLayout()}>Lijst</button></p>
            <p style={props.buttonStyle}><button onClick={() => props.slaAlarm()}>Sla alarm!</button></p>
            <div style={props.containerStyle}>
                {props.hallenSet.map((hal, i) =>
                    <div key={i} style={props.styles[i]}>
                        <p>{hal.name}</p>
                        <p>Oppervlakte: {props.oppervlaktes[i]} m²</p>
                        <p>Aantal apparaten: {props.aantalApparaten[i]}</p>
                        <p>Aantal uit te voeren acties: {props.aantalActies[i]}</p>
                        <p><Link to={'/hall/' + hal.id}>Details</Link></p>
                    </div>
                    )}
                </div>

            </div>
        )

}

export default PlattegrondView;