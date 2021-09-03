import React, {Fragment} from "react";
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  console.log(props);
  return (
  <Fragment>
    <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  </Fragment>
  )
}