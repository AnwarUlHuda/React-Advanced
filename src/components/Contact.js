import React from 'react'

const Contact = () => {
  return (
    <div>
      <h3>Contact Us</h3>
      <form>
        <input type='text' className="border" placeholder='name' />
        <input type="text"  className="border" placeholder='message' />
        <button  className="border" >Submit</button>
      </form>
    </div>
  )
}

export default Contact
