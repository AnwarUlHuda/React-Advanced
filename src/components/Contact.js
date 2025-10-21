import React from 'react'

const Contact = () => {
  return (
    <div className='flex flex-col gap-8 w-1/3 justify-center m-auto'>
      <h3 className='text-center font-bold text-xl'>Contact Us</h3>
      <form className='flex w-10/11 m-auto flex-col gap-6'>
        <input type='text' className="border rounded-md h-10 px-2" placeholder='Name' />
        <input type="text" className="border rounded-md h-10 px-2" placeholder='Message' />
        <button className="border-2 w-1/4 m-auto border-green-700 rounded p-1 px-4 bg-green-600 text-white cursor-pointer" disabled>Submit</button>
      </form>
    </div>
  )
}

export default Contact
