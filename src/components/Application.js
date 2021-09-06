import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "../helpers/Selectors";


export default function Application(props) {
    
  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments: {},
    interviewer: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }))

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewer: all[2].data}))
    })
  }, []);

  const schedule = dailyAppointments.map(appointment => {
    // console.log(appointment.interview);
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment 
      key={appointment.id}
      time={appointment.time}
      student={appointment.interview ? appointment.interview.student : null}
      // interviewer={appointment.interview ? appointment.interview.interviewer : null}
      // {...appointment}
      interview={interview}
      />
    )
  })


 // axios.get('/api/days').then(response => setDays(response.data))

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
        {schedule}
        <Appointment id='last' time="5pm" />
          {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        </section>
      </main>
    </nav>
  );
}
