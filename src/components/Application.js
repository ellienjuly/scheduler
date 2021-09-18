import React, {useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";

export default function Application() {
  const {
    state,
    setState,
    setDay,
    dailyAppointments,
    availableInterviewers,
    bookInterview,
    cancelInterview,
    getDays,
    getAppointments,
    getInterviewers,
    getInterview,
    getAppointmentsForDay
  } = useApplicationData();

  useEffect(() => {
    Promise.all([
      getDays(),
      getAppointments(),
      getInterviewers()
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
      console.log('THIS.STATE----', state);
    })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          id={appointment.id}
          key={appointment.id}
          time={appointment.time}
          student={appointment.interview ? appointment.interview.student : null}
          interview={getInterview(state, appointment.interview)}
          interviewers={availableInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
