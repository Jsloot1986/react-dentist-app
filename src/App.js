import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
//import Calendar from "./Calendar";
//import Day from "./Day";
import { dentists, assistants, appointments, patients } from "./components/Data";

const patientsNew = patients;
const assistantsNew = assistants;
const dentistsNew = dentists;
const appointmentsNew = appointments;

export default function App() {

  const [dentists, setDentists] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  console.log(dentists);
  console.log(assistants);
  console.log(patients);
  console.log(appointments);



  useEffect(() => {
    setDentists({dentistsNew})
    setAssistants({assistantsNew})
    setPatients({patientsNew})
    setAppointments({appointmentsNew})
  }, []);

 

  
  return (<h1>hello</h1>
    /*
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
                  <Calendar appointments={appointments} dentists={dentists} />
                </Route>
                <Route path="/day">
                  <Day appointments={appointments} dentists={dentists} />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      */)
  }