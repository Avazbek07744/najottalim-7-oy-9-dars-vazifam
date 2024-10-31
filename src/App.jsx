import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, clear, remove, update } from './store/formaSlice'

const App = () => {
  const { value } = useSelector(state => state.form)
  const dispatch = useDispatch()
  const usernameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const formRef = useRef()

  function hendelAdd(e) {
    e.preventDefault()
  
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
  
    if (username.length < 3) {
      alert('Ism kamida 3ta harfdan iborat bo\'lishi kerak');
      return;
    }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email manzili noto\'g\'ri');
      return;
    }
  
    const user = {
      id: Date.now(),
      name: username,
      email: email,
      age: ageRef.current.value
    }
  
    dispatch(add(user))
    formRef.current.reset()
  }
  

  function hendleDelete(id) {
    dispatch(remove(id))
  }

  function hendleUpdateAge(value) {
    let updateName = prompt('Ismingizni kiriting', value.name)
    let updateAge = prompt('Yoshingizni kiriting', value.age)

    let user = {
      name: updateName,
      email: value.email,
      id: value.id,
      age: updateAge
    }
    dispatch(update(user))
  }

  function hendleClear(e) {
    e.preventDefault()
    dispatch(clear())
  }

  return (
    <div>
      <form ref={formRef} className='max-w-[400px] pt-3 pb-8 px-5 shadow-xl shadow-white rounded-xl mx-auto my-10 mt-10 text-white'>
        <h1 className='text-2xl text-center mb-5 font-bold'>Forma</h1>
        <div className='flex flex-col gap-3 mb-3 text-xl'>
          <label className='font-semibold px-5' htmlFor="username">Enter Username</label>
          <input ref={usernameRef} className='py-2 px-5 outline-none border border-white rounded-md bg-transparent placeholder:text-white' type="text" id="username" placeholder='Enter Username' />
        </div>
        <div className='flex flex-col gap-3 mb-3 text-xl'>
          <label className='font-semibold px-5' htmlFor="age">Enter Age</label>
          <input ref={ageRef} className='py-2 px-5 outline-none border border-white rounded-md bg-transparent placeholder:text-white' type="number" id="age" placeholder='Enter Age' />
        </div>
        <div className='flex flex-col gap-3 mb-3 text-xl'>
          <label className='font-semibold px-5' htmlFor="email">Enter Email</label>
          <input ref={emailRef} className='py-2 px-5 outline-none border border-white rounded-md bg-transparent placeholder:text-white' type="email" id="email" placeholder='Enter Email' />
        </div>
        <button onClick={hendelAdd} className='bg-blue-600 text-white text-xl py-2 w-full rounded-xl hover:bg-blue-800 mt-3'>Add</button>
      </form>

      <div className='flex flex-wrap gap-5'>
        {
          value.length > 0 && value.map((value, index) => {
            return (
              <div key={index}>
                <div className='flex flex-col gap-3 p-5 w-72 border border-blue-500 rounded-lg text-xl text-white'>
                  <h3>{value.name}</h3>
                  <h2>{value.age}</h2>
                  <h3>{value.email}</h3>
                  <button onClick={() => { hendleUpdateAge(value) }} className='capitalize bg-yellow-500 py-2 rounded-md text-white'>edit</button>
                  <button onClick={() => { hendleDelete(value.id) }} className='capitalize bg-red-500 py-2 rounded-md text-white'>delete</button>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className='text-center my-10'>
        <button onClick={hendleClear} className='w-36 text-2xl capitalize bg-red-500 py-2 rounded-md text-white'>clear</button>
      </div>
    </div>
  )
}

export default App
