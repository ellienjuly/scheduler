export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(data => {
    return (data.name === day)
  });

  //passing the test condition
  if (!selectedDay.length || !state.days.length) {
    return [];
  }

  let allAppointments = selectedDay[0].appointments;
  let appointmentArray=[];

  for (let item of allAppointments) {
    appointmentArray.push(state.appointments[item])
  }
  return appointmentArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];
  const student = interview.student;

  return { student, interviewer };
}
