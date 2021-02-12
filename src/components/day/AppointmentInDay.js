import React, {Component} from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

class AppointmentInDay extends Component{
  constructor() {
    super();
    this.state = { dentistSick: "" };
  }

  render() {
    let dentistSick = false;
    this.props.dentists.forEach((element) => {
      if (
        element.isSick === true &&
        element.name.toUpperCase() === this.props.dentist.toUpperCase()
      )
        dentistSick = true;
    });
    let text = "";
    if (dentistSick) text = "appointmentRed";
    else text = "appointment";

    return (
      <li className={text}>
        <div className="time">{format_time(this.props.time)}</div>
        <div className="patient">Patiënt: {this.props.patient}</div>
        <div className="dentist">Tandarts: {this.props.dentist}</div>
        <div className="assistant">Assistent: {this.props.assistant}</div>
        <div className="containerButton">
          <button
            className="button"
            onClick={(e) => this.props.removeAppointment(this.props.patient, this.props.dentist, this.props.time)}
          >
            Remove
        </button>
          <button
            className="button"
            onClick={(e) => this.props.changeAppointment(this.props.patient, this.props.dentist, this.props.time)}
          >
            Change
          </button>
        </div>
      </li>
    );
  }
}
export default AppointmentInDay;