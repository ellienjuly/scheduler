import React, {Fragment} from "react";
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Create from "components/Appointment/Create";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
  <Fragment>
    <article className="appointment">
    <Header time={props.time}/>
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, true)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Create onCancel={() => back()}/>
      )}
    </article>
  </Fragment>
  )
}