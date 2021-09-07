import React, {Fragment} from "react";
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Edit from "components/Appointment/Edit";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CANCEL = 'CANCEL';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';

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

  function confirm() {
    transition(CONFIRM)
  }

  function cancel() {
    transition(CANCEL)

    setTimeout(() => props.cancelInterview(props.id)
    .then(transition(EMPTY)), 1000)
    
  }

  function edit(){
    transition(EDIT)
  }

  console.log(props);

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
          onEdit={edit}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CANCEL && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Do you want to cancel this appointment?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={cancel}
        />
      )}
    </article>
  </Fragment>
  )
}