import React, {useState} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import "components/Application.scss";

const days = [{
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const appointment = appointments.map(appointment => {
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
  return (
    <nav>
      <main className="layout">
        <section className="sidebar">
        <DayList
        days={days}
        day={day}
        setDay={setDay} />
          {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        </section>
        <section className="schedule">
        {appointment}
          {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        </section>
      </main>
    </nav>
  );
}
