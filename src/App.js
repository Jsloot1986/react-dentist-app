import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";

import generateRandomAppointments from "./utils";

const appointments = generateRandomAppointments(70);
let patienten = [];

const addPatients = patient => {
  const patientData = patient.split(";");
  if (patientData.length === 7) {
    const name = patientData[0];
    const surname = patientData[1];
    const gender = patientData[2];
    const region = patientData[3];
    const year = patientData[4];
    const email = patientData[5];
    const phone = patientData[6];
    const sick = patientData[7];
     patienten.push({ name, surname, gender, region, year, email, phone, sick });
  }
 
};

function App() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/patientData/patientendata.csv")
      .then((response) => response.text())
      .then((patientData) => {
        const patientInfo = patientData.split("\n");
        patientInfo.forEach((patient) => addPatients(patient));
        setPatients({ patienten });
  });
  }, []);
  
  console.log(patients);
 
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/calendar">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
              </ul>
            </nav>
            <main>
              <Switch>
                <Route path="/calendar">
                  <Calendar appointments={appointments} />
                </Route>
                <Route path="/day">
                  <Day appointments={appointments.filter(app => app.day === 1)} />
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
export default App;