
  export function getAppointmentsForDay(state, day) {
    const appointments = state.days.filter(data => data.name === day);
    appointments[0]
    return appointments;
  }