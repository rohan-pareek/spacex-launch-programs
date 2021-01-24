import React from 'react';

export default function Program({program}) {
    return (
        <div className="program">

            <div className="mission-logo">
                <img src={program.links.mission_patch} alt={program.mission_name} />
            </div>

            <div className="mission-title">
                {program.mission_name} #{program.flight_number}
            </div>

            <div className="mission-id">
                <label>Mission Ids:</label>
                {program.mission_id && program.mission_id.length>0 && <ul>
                    {program.mission_id.map(id => (
                        <li key = {id}>{id}</li>
                    ))}
                </ul>}
            </div>

            <div className="launch-year">
                <label>Launch Year:</label>
                {program.launch_year}
            </div>

            <div className="launch-success">
                <label>Successful Launch:</label>
                {program.launch_success?.toString()}
            </div>

            <div className="land-success">
                <label>Successful Landing:</label>
                {program.rocket.first_stage.cores[0].land_success
                ?program.rocket.first_stage.cores[0].land_success.toString()
                :'false'
            }
            </div>

        </div>
    )
}
