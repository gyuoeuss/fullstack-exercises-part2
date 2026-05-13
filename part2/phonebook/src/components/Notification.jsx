const Notification = ({ message ,messagetype}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messagetype}>
        
      {message}
    </div>
  )
}

export default Notification