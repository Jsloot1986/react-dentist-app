import React, {Component} from "react";
import "./Calendar.css";
import DayInMonth from "./DayInMonth";

const workingDays = (counter, rel, days2) => {
  counter = counter + 1;
  if (counter % 7 === 6 || counter % 7 === 0) {
    return <p>Vrij</p>
  } else {
    if (days2.includes(counter)) {
      return <p>Vrij</p>
    } else {
      rel[counter] = [];
      rel[counter].push({
        id: 0,
        day: counter,
        time: 0,
        patient: "",
        dentist: "",
        assistant: "",
        treatment: "",
      });
    }
  }
  return counter;
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { dentist: "Duncan" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ dentist: e.target.value });
    e.preventDefault();
  }

  render() {
    let days = [];
    let appointmentsSorted = this.props.appointments.sort(function (a, b) {
      let time1 = parseInt(a.time);
      let time2 = parseInt(b.time);
      if (time1 < time2) {
        return -1;
      }
      if (time1 > time2) {
        return 1;
      }
      return 0;
    });

    const divideByDay = (appointments) => {
      const appointmentsByDay = {};
      appointments.forEach((appointment) => {
        if (
          appointment.dentist === this.state.dentist && this.state.dentist !== ""
        ) {
          const day = appointment.day;
          if (!appointmentsByDay.hasOwnProperty(day)) {
            appointmentsByDay[day] = [];
          }
          appointmentsByDay[day].push(appointment);
          if (days.includes(appointment.day)) {
          } else days.push(appointment.day);
        }
      });
      return appointmentsByDay;
    };

    const appointmentsByDay = divideByDay(appointmentsSorted);
    let dayOne = days[0];
    let counter = 0;
    let prevDay = 0;
    let daysTwo = days;
    if (dayOne > 1) {
      while (counter < dayOne) {
        counter = workingDays(counter, appointmentsByDay, daysTwo);
        days.push(counter);
      }
    }

    days.forEach((element) => {
      if (element - prevDay > 1) {
        counter = prevDay;
        while (element - counter > 1) {
          counter = workingDays(counter, appointmentsByDay, daysTwo);
        }
      }
      prevDay = element;
    });
    if (prevDay < 26) {
      counter = prevDay;
      while (counter < 26) {
        counter = workingDays(counter, appointmentsByDay, daysTwo);
      }
    }
    const daysInMonthJSX = Object.values(appointmentsByDay).map((appointmentsInDay, index) => (
      <DayInMonth appointments={appointmentsInDay} key={index} />
    ));

    return (
      <div>
        <form>
          <label> Tandarts:
         <select onChange={this.handleChange}>
              <option value="kies tandarts">Kies tandarts</option>
              <option value="Anne">Anne</option>
              <option value="Duncan">Duncan</option>
              <option value="Joost">Joost</option>
              <option value="Sabine">Sabine</option>
            </select>
          </label>
        </form>
        <div className="calendarview">
          <div className="header">
            <div>Maandag</div>
            <div>Dinsdag</div>
            <div>Woensdag</div>
            <div>Donderdag</div>
            <div>Vrijdag</div>
          </div>
          <div className="table">{daysInMonthJSX}</div>
        </div>
      </div>
    )
  }
}
export default Calendar;