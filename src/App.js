import React, {Component} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Day from "./components/day/Day";
import Sick from "./components/callInSick/Sick";
import AppointmentMan from "./components/appointmentManagement/AppointmentMan"
import PatientContainer from "./components/patientFile/PatientContainer"
import {dentistsArr, assistantsArr} from "./components/patientsRecords/Data"

const patientsArr = [];
  const addPatient = patient => {
    const data = patient.split(";");
    if (data.length === 8) {
      const name = data[0];
      const surname = data[1];
      const gender = data[2];
      const region = data[3];
      const year = data[4];
      const email = data[5];
      const phone = data[6];
      const isSick = data[7];
      patientsArr.push({
        name, surname, gender, region, year, email, phone, isSick
      })
    }
};
  const appointmentsArr = [];
  const addAppointment = app => {
    const data = app.split(";");
    if (data.length === 7) {
      const id = data[0];
      const day = data[1];
      const time = data[2];
      const patient = data[3];
      const dentist = data[4];
      const assistant = data[5];
      const treatment = data[6];
      appointmentsArr.push({ id, day, time, patient, dentist, assistant, treatment })
    }
};

class App extends Component{
  constructor() {
    super();
    this.state = {
      dentists: [],
      assistants: [],
      patients: [],
      appointments: [],
      sickPeople: [],
      loading: false
    }
  }


  componentDidMount() {
    fetch("/patientData/patientendata.csv")
      .then((response) => response.text())
      .then((patientData) => {
      const patientItems = patientData.split("\n");
      patientItems.forEach((patient) => addPatient(patient));
      this.setState({ patients: patientsArr, loading: true })
    });
    fetch("/patientData/appointments.csv")
      .then((response) => response.text())
      .then((appointmentData) => {
        const appointmentItems = appointmentData.split("\n");
        appointmentItems.forEach((app) => addAppointment(app));
        this.setState({ appointments: appointmentsArr, loading: true });
      })
    this.setState({ dentists: dentistsArr })
    this.setState({ assistants: assistantsArr })
  };



  render() {
    if (this.state.loading !== true) {
      return <h1>Loading....</h1>
    } else {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  {" "}
                  <Link to={"/"} className="nav-link">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"./calendar"}>Calendar view</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"./day"} className="nav-link">{" "}Day view{ " "}</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/sick"} className="nav-link">{" " }Call in Sick/Better{" " }</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/appointmentMan"}>New Appointment</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/patientContainer"}>PatientFiles</Link>
                </li>
              </ul>
            </nav>
            <main>
              <Switch>
                <Route path="/calendar">
                  <Calendar key={this.state.appointments.id} appointments={this.state.appointments} dentists={this.state.dentists}/>
                </Route>
                <Route path="/day">
                  <Day key={this.state.appointments.id} appointments={this.state.appointments} dentists={this.state.dentists}/>
                </Route>
                <Route path="/sick">
                  <Sick 
                    appointments={this.state.appointments}
                    dentists={this.state.dentists}
                    patients={this.state.patients}
                    assistants={this.state.assistants}
                    />
                </Route>
                <Route path="/appointmentMan">
                  <AppointmentMan {...this.state}
                  />
                </Route>
                <Route path="/patientContainer">
                  <PatientContainer patients={this.state.patients}/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      )
    }
  }
}
export default App;