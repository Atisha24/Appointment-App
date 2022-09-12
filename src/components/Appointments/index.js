// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentLists: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isLiked: !eachApp.isLiked}
        }
        return eachApp
      }),
    }))
  }

  onAddButton = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentLists, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentLists.filter(
        eachAppointmentItem => eachAppointmentItem.isLiked === true,
      )
    }
    return appointmentLists
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="appointment-app-container">
          <div className="add-appointment-container">
            <div className="add-title-date-container">
              <form className="form" onSubmit={this.onAddButton}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="title"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                  className="input"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  className="input"
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointments-starred-btn">
            <h1 className="appointments">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleIsLiked={this.toggleIsLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
