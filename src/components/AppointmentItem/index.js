// Write your code here
// import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsLiked} = props
  const {id, title, date, isLiked} = appointmentDetails
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  //  const appointedTime = format(new Date(date, 'dd MMMM yyyy, EEEE'))

  const onClickLiked = () => {
    toggleIsLiked(id)
  }

  return (
    <li className="appointment-list">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <button type="button" className="star-btn" onClick={onClickLiked}>
          <img src={likeImageUrl} alt="star" className="liked-image" />
        </button>
      </div>
      <p className="date">Date {date}</p>
    </li>
  )
}

export default AppointmentItem
