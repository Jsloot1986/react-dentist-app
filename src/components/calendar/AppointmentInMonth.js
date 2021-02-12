import React, {Component} from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);


class AppointmentInMonth extends Component{
  render() {
    let time = this.props.time;
    let show = true;
    if (time === 0) show = false;
    if (show)
      return (
        <div className="appointment">
          <span className="time">{format_time(this.props.time)}</span>
          <span className="patient">{this.props.patient}</span>
        </div>
      );
    else 
      return (
        <div className="appointment">
          <span></span>
          </div>
      )
  }
}
export default AppointmentInMonth
