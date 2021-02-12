import React from 'react';

const PatientItem = (props) => {
    const { name, surname } = props.patient;

    return (
        <div className="patient-item-container">
            <div className="patient-item" onClick={() => props.handlePatientView(props.patient)}>
                <div className="patient-info">
                    <h2>{name}</h2>
                    <h2>{ surname}</h2>
                </div>
            </div>
        </div>
    )
}
export default PatientItem;