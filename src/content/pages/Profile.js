import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  //Declare and initialize state
  let [serverMessage, setServerMessage] = useState('')

  const callServer = () => {
    let token = localStorage.getItem('userToken')
    console.log('token is', token)

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('In the .then() code', response)
      response.json().then(result => {
        if (response.ok) {
          console.log('YAY')
        }
        else {
          console.log('Darn', result)
          setServerMessage('No secret message for youuuuuu!')
        }
      })
      .catch(err => {
        console.log('Error in parsing JSON')
      })
    })
    .catch(err => {
      console.log('Some sort of error', err)
    })
  }


  // if there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile-pic" src={props.user.profileUrl} />
      <p>
        <strong> Email:</strong>
        {props.user.email}
      </p>
      <button onClick={callServer}>Call /profile route on server</button>
    </div>
  )
}

export default Profile
