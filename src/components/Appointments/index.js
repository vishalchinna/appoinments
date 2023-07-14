import {Component} from 'react'

import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], toggleList: [], title: '', date: '', tgle: true}

  onChangeInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    console.log(event.target.value)
    const dateFormate = format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({date: dateFormate})
  }

  toggleLikeIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  AddAppointment = () => {
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
    this.setState(prevState => ({
      toggleList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  filterAppointment = () => {
    const {tgle, appointmentList, toggleList} = this.state
    const filterDate = appointmentList.filter(each => each.isStarred === true)

    if (tgle) {
      this.setState({appointmentList: filterDate})
      this.setState(prevState => ({
        tgle: !prevState.tgle,
      }))
    } else {
      console.log(true)
    }
  }

  render() {
    const {appointmentList, title, date} = this.state

    return (
      <div className="bg-container">
        <div className="box-container">
          <div className="data-box">
            <form className="Input-box">
              <h1 className="head">Add Appointment</h1>
              <label className="label-title" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                value={title}
                type="text"
                className="title"
                placeholder="title"
                onChange={this.onChangeInput}
              />
              <label className="label-date" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                value={date}
                placeholder="dd/mm/yyyy"
                className="date"
                onChange={this.onChangeDate}
              />
              <button
                type="button"
                className="btn"
                data-testid="button"
                onClick={this.AddAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="pic"
            />
          </div>
          <hr />
          <div className="item-tag">
            <h1 className="head">Appointments</h1>
            <button
              type="button"
              onClick={this.filterAppointment}
              className="star-btn"
            >
              Starred
            </button>
          </div>
          <ul className="ul-box">
            {appointmentList.map(each => (
              <AppointmentItem
                key={each.id}
                toggleLikeIcon={this.toggleLikeIcon}
                information={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
