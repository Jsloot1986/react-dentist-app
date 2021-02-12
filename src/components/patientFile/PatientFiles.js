import React from 'react';
import PatientItem from './PatientItem';

const PatientFiles = (props) => {
    return (
        <div>
        <label htmlFor="search">Search by name</label>
            <input type="text" value={props.inputValue} onChange={props.patientFilterOnChange} />
            <div className="patient-list">
                {props.patients.map(patient => {
                    return <PatientItem
                        patient={patient}
                        key={patient.id}
                        handlePatientView={props.handlePatientView}
                    />
                })}
            </div>
        </div>
    )
}
export default PatientFiles;