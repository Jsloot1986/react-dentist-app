import React, {Component} from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";

let indexPrev = 0;
let idPrev = 0;

const getSortedTime = (rel) =>
  rel.sort(function (a, b) {
    let timeOne = parseInt(a.time);
    let timeTwo = parseInt(b.time);
    if (timeOne < timeTwo) {
      return -1;
    }
    if (timeOne > timeTwo) {
      return 1;
    }
    return 0;
  });

const searchPrevRecord = (appointments, day, dentist, time) => {
  appointments.forEach((element, index) => {
    if (parseInt(element.day) === parseInt(day) &&
      element.dentist === dentist &&
      parseInt(element.time) === parseInt(time)) {
      indexPrev = index;
      idPrev = element.id;
    }
  });
  return [indexPrev, idPrev];
};

const removeRecord = (appointments, indexPrev) => appointments.splice(indexPrev, 1);

const addRecord = (appointments, idPrev, dentist, patient, newDay, newTime) =>
  appointments.push({
    id: idPrev,
    dentist: dentist,
    patient: patient,
    day: newDay,
    time: newTime,
  });

class Day extends Component {
  constructor() {
    super();
    this.state = {
      dentist: "Duncan",
      day: 0,
      time: 0,
      appointments: [],
      change: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.removeAppointment = this.removeAppointment.bind(this);
    this.changeAppointment = this.changeAppointment.bind(this);
  }

  handleChange(e) {
    this.setState({ dentist: e.target.value, change: false });
    e.preventDefault();
  }

  handleChangeClick(e) {
    let newDay = parseInt(document.getElementById("newDay").value);
    let newTime = parseInt(document.getElementById("nemTime").value);
    if (newDay % 7 === 6 || newDay % 7 === 0)
      alert("choose an other day this is a weekendday!");
    else {
      indexPrev = 0;
      this.props.appointments.forEach((element, index) => {
        if (element.day === newDay && element.dentist === this.state.dentist && element.time === newTime)
          indexPrev = index;
      });
      if (indexPrev !== 0)
        alert("dentist has already an appointment on this day and time");
      else {
        idPrev = 0;
        let prevRecord = searchPrevRecord(
          this.props.appointments,
          this.state.day,
          this.state.dentist,
          this.state.time
        );
        indexPrev = prevRecord[0];
        idPrev = prevRecord[1];

        if (indexPrev !== 0) {
          removeRecord(this.props.appointments, indexPrev);
          addRecord(
            this.props.appointments,
            idPrev,
            this.state.dentist,
            this.state.patient,
            newDay,
            newTime);
          this.setState({
            appointments: this.props.appointments,
            change: false
          });
          
        } else alert("nothing found");
      }
    }
    e.preventDefault();
  }

  handleClick(e) {
    let dayInput = document.getElementById("day").value;
    this.setState({ day: dayInput, change: false });
    e.preventDefault()
  }

  removeAppointment(patient, dentist, time) {
    let removeId = 0;
    let found = false;
    this.props.appointments.forEach((element, index) => {
      if (element.patient === patient &&
        element.dentist === dentist &&
        element.time === time) {
        found = true;
        removeId = index;
      }
    });
    if (found === true)
      removeRecord(this.props.appointments, removeId);
    this.setState({ appointments: this.props.appointments });
  }


  changeAppointment(patient, dentist, time) {
    this.setState({
      patient: patient,
      dentist: dentist,
      time: time,
      change: true,
    })
  }
  
  componentDidMount() {
    this.setState({ appointments: this.props.appointments });
  }
  

  render() {
    let appointments2 = this.state.appointments.filter((element) => element.dentist === this.state.dentist &&
      parseInt(element.day) === parseInt(this.state.day));
    let appointmentsSorted = getSortedTime(appointments2);

    const appointmentsJSX = appointmentsSorted.map(({ time, patient, dentist, assistant }, index) => (
      <AppointmentInDay
        time={time}
        patient={patient}
        dentist={dentist}
        assistant={assistant}
        changeAppointment={this.changeAppointment}
        removeAppointment={this.removeAppointment}
        dentists={this.props.dentists}
        key={index}
      />
    )
    );
    let dentistMapped = this.props.dentists.map((element) => (
      <option value={element.name}>{element.name}</option>
    ));

    return (
      <div>
        <h3>
          Verwijder of wijzig hier een afspraak
      </h3>
        <form className="dayquery">
          {this.state.change ? (
            <div>
              <label>Dentist : {this.state.dentist}</label><br />
              <label>Day : {this.state.day}</label>
              <p>Time : {this.state.time}</p>
              <p>Patient: {this.state.patient}</p>
              <label>New Day</label>
              <input id="newDay" type="number" name="day" min="1" max="28" />
              <label>New Time</label>
              <input
                id="newTime"
                type="number"
                name="time"
                min="7"
                max="19"
              />
              <button onClick={this.handleChangeClick}>Change</button>
            </div>
          ) : (<div className="inputcontainer">
            <label className="dentistlabel">
              Dentist
            <select onChange={this.handleChange}>{dentistMapped}</select>
            </label>
            <label>Day
            <input id="day" type="number" name="day" min="1" max="28" />
            </label>
            <button onClick={this.handleClick}>show dayschudule</button>
          </div>)}
        </form>
        <ul className="dayview">{appointmentsJSX}</ul>
      </div>
    );
    
  }
}
export default Day;
