import React from 'react';


const PatientCard = (props) => {
    const { name, surname, gender, phone, email, location, year } = props.patient;

    return (
        <div className="patient-card-container">
            <div className="patient-card" onClick={() => props.handlePatientGoBack(props.patient)}>
                <h2><b>Name : </b>{name}</h2>
                <h2><b>Surname : </b>{surname}</h2>
                <p><b>Year : </b>{ year}</p>
                <p><b>Location : </b>{location}</p>
                <p><b>Gender : </b>{gender}</p>
                <p><b>Phone : </b>{phone}</p>
                <p><b>E-mail : </b>{ email}</p>
            </div>
        </div>
    )
}
export default PatientCard;