import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import axios from 'axios';


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments: {}
  });
  const dailyAppointments=[];
  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({ ...prev, days }))

  const appointment = dailyAppointments.map(appointment => {
    return (
      <Appointment 
      key={appointment.id}
      // time={appointment.time}
      // student={appointment.interview ? appointment.interview.student : null}
      // interviewer={appointment.interview ? appointment.interview.interviewer : null}
      {...appointment}
      />
    )
  })

  useEffect(() => {
    axios.get('/api/days').then(response => setDays(response.data))
  }, []);


  return (
    <nav>
      <main className="layout">
        <section className="sidebar">
        <DayList
        days={state.days}
        day={state.day}
        setDay={setDay} />
          {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        </section>
        <section className="schedule">
        {appointment}
        <Appointment id='last' time="5pm" />
          {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        </section>
      </main>
    </nav>
  );
}
