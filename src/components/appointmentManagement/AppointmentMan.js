import React, {Component} from "react";
import "./appointmentMan.css";

class AppointmentMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: [],
            dentist: "",
            assistant: "",
            patientName: "",
            patientSurName: "",
            day: 0,
            newTime: 0,
            treatment: "",
            appointments: [],
            patients: [],
            assistants: [],
            dentists: [],
            progress: false,
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTreatments = this.handleTreatments.bind(this);
    }

    componentDidMount() {
        this.setState({
            appointments: this.props.appointments,
            dentists: this.props.dentists,
            assistants: this.props.assistants,
            patients: this.props.patients,
            loading: this.props.loading
        });
    }

    handleChange(e) {
        if (e.target.name === "dentist") this.setState({ dentist: e.target.value });
        else this.setState({ assistant: e.target.value });
        e.preventDefault();
    }

    handleTreatments(e) {
        this.setState({ treatment: e.target.value });
        e.preventDefault();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let dentist = document.getElementById("dentist").value;
        let assistant = document.getElementById("assistant").value;
        let day = parseInt(document.getElementById("day").value);
        let time = parseInt(document.getElementById("time").value);
        let patientName = document.getElementById("patientName").value;
        let patientSurName = document.getElementById("patientSurName").value;
        let treatment = document.getElementById("treatment").value;
        if (day < 1 || day > 28) alert("choose a day between 1 and 28");
        else if (day % 7 === 0 || day % 7 === 6) alert("only weekdays avaible");
        else if (time < 8 || time >= 18) alert("choose a time between 8 and 18");
        else {
            let patientRegister = false;
            let isIll = false;
            this.state.patients.forEach((element) => {
                if (element.name.toUpperCase() === patientName.toUpperCase() &&
                    element.surName.toUpperCase() === patientSurName.toUpperCase()) {
                    patientName = element.name;
                    patientSurName = element.surName;
                    if (element.isSick === true) isIll = true;
                    patientRegister = true;
                }
            });
            if (patientRegister === false)
                alert("Patient is not in register");
            else {
                if (isIll === true)
                    alert("this patient is sick, patient cann't make appointment! Call better or choose other patient")
                else {
                    let haveAppointment = false;
                    let id = 0;
                    this.props.appointments.forEach((element) => {
                        if (element.dentist === dentist &&
                            parseInt(element.time) === parseInt(time) &&
                            parseInt(element.day) === parseInt(day))
                            haveAppointment = true;
                        if (element.id > id) id = element.id;
                    });
                    id += 1;
                    if (haveAppointment === true)
                        alert("This dentist has already an appointment on this day and time");
                    else {
                        this.setState({ progress: true });
                        this.props.appointments.push({
                            id: id,
                            day: day,
                            time: time,
                            patient: patientName + " " + patientSurName,
                            dentist: dentist,
                            assistant: assistant,
                            treatment: treatment,
                        });
                        this.setState({ appointments: this.props.appointments });
                        setTimeout(() => {
                            this.setState({ progress: false });
                            document.getElementById("dentist").value = "";
                            document.getElementById("assistant").value = "";
                            document.getElementById("time").value = "";
                            document.getElementById("day").value = "";
                            document.getElementById("patientName").value = "";
                            document.getElementById("patientSurName").value = "";
                            document.getElementById("treatment").value = "";
                        }, 1000);
                    }
                }
            }
        }
    }
    render() {
        if (this.state.loading !== true) {
            return <h1>Loading...</h1>
        } else {
            console.log(this.props.patients);
            console.log(this.state.patients);
            let progress = false;
            //if (this.state.progress) progress = false;

            return (
                <div className="appointment-container">
                    <h3>verwijderen of wijzigen van een afspraak? ga naar het dagoverzicht!</h3>
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <div className="container1">
                            <p className="label">Dentist</p>
                            <select id="dentist" onChange={this.handleChange}>
                                <option value="">Choose dentist</option>
                                <option value="Anne">Anne</option>
                                <option value="Duncan">Duncan</option>
                                <option value="Joost">Joost</option>
                                <option value="Sabine">Sabine</option>
                            </select>
                        </div>
                        <br />
                        <div className="container2">
                            <p className="label">Assistant</p>
                            <select id="assistant" onChange={this.handleChange}>
                                <option value="">No assistant</option>
                                <option value="Andre">Andre</option>
                                <option value="Josje">Josje</option>
                            </select>
                        </div>
                        <br />
                        <div className="container3">
                            <p className="label">Day</p>
                            <input id="day" type="number" name="day" min="1" max="28" placeholder="0" />
                        </div>
                        <div className="container4">
                            <p className="label">Time</p>
                            <input id="time" type="number" name="time" value={this.state.time} placeholder="0" />
                        </div>
                        <br />
                        <div className="container5">
                            <p className="label">FirstName</p>
                            <input id="patientName" type="text" placeholder="name" />
                            <p className="label">LastName</p>
                            <input id="patientSurName" type="text" placeholder="surname" />
                        </div>
                        <br />
                        <div className="container6">
                            <p className="label">Treatment</p>
                            <select id="treatment" onChange={this.handleTreatments}>
                                <option value="">Choose treatment</option>
                                <option value="controle">Controle</option>
                                <option value="mondhygiene">Mondhygiëne</option>
                                <option value="vullen">Vullen</option>
                                <option value="wortelkanaal">Wortelkanaal</option>
                            </select>
                        </div>
                        <br />
                        <br />
                        <br />
                        <button className="submitButton">Add Appointment</button>
                    </form>
                    {progress ? (
                        <p>Appointment is in calendar!</p>
                    ) : (
                            <p></p>
                        )}
                </div>
            );
        }
    }
}
export default AppointmentMan;