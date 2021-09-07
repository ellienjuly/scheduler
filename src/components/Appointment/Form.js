import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


export default function Edit(props) {
  // const save = () => (props.onSave ? props.name : null)
  // const cancel = () => (props.onCancel? setName('') : setName(name))
  const [name, setName] = useState(props.name || '')
  const [interviewer, setInterviewer] = useState(props.interviewer || null)


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>     
        <input
          className="appointment__create-input text--semi-bold"
          name={props.name}
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers} 
        interviewer={interviewer}
        setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger>Cancel</Button>
        <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
  )
}