import React, { useEffect } from 'react'

const User = () => {

  useEffect(() => {
    return () => {
      console.log('unmounted');
    }
  }, [])

  return (
    <div style={{display:'grid', justifyItems:'center'}}>
      <h2>Name : Programmer</h2>
      <h2>Location : INDIA</h2>
      <h2>This is a React project, developed as a part of learning with real time ( Industry -Level ) examples.</h2>
    </div>
  )
}

export default User

