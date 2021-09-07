import React, {Fragment} from "react";
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    transition(SAVING)
    
    setTimeout(() =>
      transition(SHOW)
    , 1000)
  }

  return (
  <Fragment>
    <article className="appointment">
    <Header time={props.time}/>
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : null} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, true)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
    </article>
  </Fragment>
  )
}