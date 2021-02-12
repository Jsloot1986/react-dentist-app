import React, {Component} from "react";
import AppointmentInMonth from "./AppointmentInMonth";


class DaysInMonth extends Component {
  render() {
    let appointments_month = this.props.appointments.sort();

    const appointmentsJSX = appointments_month.map(({ day, time, patient }, index) => (
      <AppointmentInMonth time={time} patient={patient} key={index} />
    ));
    return <div className="day">{appointmentsJSX}</div>;
  }
}
  
  export default DaysInMonth;
