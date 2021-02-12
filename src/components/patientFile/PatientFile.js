import React from 'react';
import PatientCard from './PatientCard';

const PatientFile = (props) => {
    return (
        <div>
            <button onClick={props.handlePatientGoBack}>Back</button>
            <PatientCard
                patient={props.patient}
                handlePatientGoBack={props.handlePatientGoBack}
                key={props.patient.id}
            />
        </div>
    )
}
export default PatientFile;