import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/Selectors";


export default function Application(props) {
    
  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const availableInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({...state, day});

  // const setDays = days => setState(prev => ({ ...prev, days }))

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState({
      ...state,
      appointments
    })

    return axios.put(`api/appointments/${id}`, {
      interview
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState({
      ...state,
      appointments: appointments
    })
    
    return axios.delete(`api/appointments/${id}`)
  }

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
      id={appointment.id}
      key={appointment.id}
      time={appointment.time}
      student={appointment.interview ? appointment.interview.student : null}
      // interviewer={appointment.interview ? appointment.interview.interviewer : null}
      // {...appointment}
      interviewers = {availableInterviewers}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  })


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
