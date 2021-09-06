import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
import Form from 'components/Appointment/Form'


export default function Create(props) {
  // const save = () => (props.onSave ? props.name : null)
  // const cancel = () => (props.onCancel? setName('') : setName(name))
  const [name, setName] = useState('')
  const [interviewer, setInterviewer] = useState(null)

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component
          */
        />
      </form>
      {/* <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} /> */}
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm>Save</Button>
      </section>
    </section>
  </main>
  )
}