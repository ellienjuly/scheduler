import React from 'react';
import Form from 'components/Appointment/Form';

export default function Edit(props) {
  console.log('PROPS in EDIT',props);
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
        <Form 
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={props.save}
          onCancel={props.cancel}
        />
    </section>
  </main>
  )
}