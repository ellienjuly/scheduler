import React, {useState, useEffect} from "react";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/Selectors";

export default function useApplicationData(props){
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

  function getDays() {
    return axios.get('/api/days');
  }

  function getAppointments() {
    return axios.get('/api/appointments');
  }

  function getInterviewers() {
    return axios.get('/api/interviewers');
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState(prev => ({
      ...prev,
      appointments
    }))

    return axios.put(`api/appointments/${id}`, {
      interview
    })
    .then(async res => {
      let response = await getDays();
      setState({
        ...state,
        appointments,
        days: response.data
      });
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

    return axios.delete(`api/appointments/${id}`)
    .then(async () => {
      setState({
        ...state,
        appointments: appointments
      })
      let response = await getDays();
      setState({
        ...state,
        days: response.data
      });
    })
  }
  return (
    {
      state,
      setState,
      setDay,
      cancelInterview,
      bookInterview,
      dailyAppointments,
      availableInterviewers,
      getDays,
      getAppointments,
      getInterviewers,
      getInterview,
      getAppointmentsForDay
    }
  )
}