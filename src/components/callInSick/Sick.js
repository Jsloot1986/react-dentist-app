import React, { Component } from 'react'
import "./sick.css"


const registerCallinSick = (
    staffRel,
    name,
    surname,
    staffFound,
    staffIndex
) => {
    staffRel.map((element, index) => {
        if (element.name.toUpperCase() === name.toUpperCase() &&
            element.surname.toUpperCase() === surname.toUpperCase()) {
            element.IsSick = true;
            staffFound = true;
            staffIndex = index;
        }
        return element;
    });
    return [staffFound, staffIndex];
};

const removeAppointmentPatients = (
    appointments,
    name,
    surName,
    isIll
) => {
    let indices = [];
    if (isIll === true) {
        let patientName = name.toUpperCase() + " " + surName.toUpperCase();
        appointments.forEach((element, index) => {
            if (element.patient.toUpperCase() === patientName) indices.push(index);
        });
        let nextIndex = 0;
        indices.forEach((index) => {
            appointments.splice(index - nextIndex, 1);
            nextIndex = nextIndex + 1;
        });
    }
    return indices;
};



export default class Sick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            dentitst: [],
            assistants: [],
            appointments: [],
            tobeProgressed: "",
            isIll: "",
        }
        this.registerIsSick = this.registerIsSick.bind(this);
        this.handleChangeregisterCallinSick = this.handleChangeregisterCallinSick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => e.preventDefault();

    handleChangeregisterCallinSick = (e) => {
        if (e.target.value === "sick") this.setState({ isIll: true });
        else this.setState({ isIll: false });
    }

    registerIsSick = (e) => {
        let typeOfPerson = document.getElementById("typeOfPerson").value;
        let name = document.getElementById("name").value;
        let surName = document.getElementById("surName").value;
        let personIsSick = null;
        let personFound = null;
        let personIndex = null;
        let isIll = this.state.isIll;
        this.setState({ tobeProgressed: true });
        e.preventDefault();
        switch (typeOfPerson) {
            case "patient":
                personIsSick = registerCallinSick(
                    this.props.patients,
                    name,
                    surName,
                    personFound,
                    personIndex
                );
                personFound = personIsSick[0];
                personIndex = personFound[1];
                if (personFound === true)
                    alert("patient not found!");
                else if (isIll === true)
                    removeAppointmentPatients(
                        this.props.appointments,
                        name,
                        surName,
                        isIll
                    );
                break;
            case "assistant":
                personIsSick = registerCallinSick(
                    this.props.assistants,
                    name,
                    surName,
                    personFound,
                    personIndex
                );
                personFound = personIsSick[0];
                personIndex = personIsSick[1];
                if (personFound === false)
                    alert("this assistant isn't found!");
                else this.setState({ assistants: this.props.assistants });
                break;
            case "dentist":
                personIsSick = registerCallinSick(
                    this.props.dentists,
                    name,
                    surName,
                    personFound,
                    personIndex
                );
                personFound = personIsSick[0];
                personIndex = personIsSick[1];
                if (personFound === false)
                    alert("this dentist isn't found!")
                else this.setState({ dentists: this.props.dentists });
                break;
            
            default:
                alert("something is wrong! please check if everything is correct!")
        }
        setTimeout(() => {
            this.setState({ tobeProgressed: false });
            document.getElementById("typeOfPerson").value = "";
            document.getElementById("name").value = "";
            document.getElementById("surName").value = "";
            let sickRadio = Array.from(document.getElementsByClassName("sick"));
            sickRadio.forEach((element) => (element.checked = false));
        }, 1000);
    }

    componentDidMount() {
        this.setState({
            patients: this.props.patients,
            assistants: this.props.assistants,
            dentists: this.props.dentists,
            appointments: this.props.appointments,
        });
    }

    render() {
        return (
            <div>
                <h1>Here you can call someone SICK of BETTER!</h1>
                <br />
                <br />
                <form onSubmit={this.registerIsSick}>
                    <div className="sickContainer">
                        <label className="typeOfPerson">Kind of person</label>
                        <select id="typeOfPerson" onChange={this.handleChange}>
                            <option value="">Choose Person</option>
                            <option value="dentist">Dentist</option>
                            <option value="assistant">Assistant</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>
                    <br />
                    <div className="sickContainer">
                        <p className="sickRegisterName">Firstname</p>
                        <input id="name" type="text" name="name" />
                        <p className="sickRegisterSurName">Surname</p>
                        <input id="surName" type="text" name="surName" />
                    </div>
                    <br />
                    <div className="sickContainer">
                        <p className="registerSick">Call Sick/Better</p>
                        <p className="registerSick2">Sick</p>
                        <input
                            className="sick"
                            type="radio"
                            name="isIll"
                            value="sick"
                            onChange={this.handleChangeregisterCallinSick}
                        />
                        <p className="registerSick2">Better</p>
                        <input
                            className="sick"
                            type="radio"
                            name="isIll"
                            value="better"
                            onChange={this.handleChangeregisterCallinSick}
                        />
                    </div>
                    <br />
                    <button className="submitButton">
                        conform the registration
                    </button>
                </form>
                {this.state.tobeProgressed ? <p>Your progess will be saved</p> : <p></p>}
            </div>
        );
    }
}
