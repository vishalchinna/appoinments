import './index.css'

const AppointmentItem = prop => {
  const {information, toggleLikeIcon} = prop
  const {title, date, id, isStarred} = information
  const onclickLikeIcon = () => {
    toggleLikeIcon(id)
  }

  return (
    <li className="bx-container">
      <div className="star-container">
        <li className="name">{title}</li>
        <button
          className="butn"
          type="button"
          onClick={onclickLikeIcon}
          data-testid="star"
        >
          {isStarred ? (
            <img
              className="star-pic"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          ) : (
            <img
              className="star-pic"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          )}
        </button>
      </div>
      <li className="date-box">Date: {date}</li>
    </li>
  )
}

export default AppointmentItem
