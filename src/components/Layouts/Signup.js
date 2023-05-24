import React,{useState} from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const submitHandler=async (e)=>{
        e.preventDefault()
        const obj= {
            name,
            email,
            password
        }
        console.log(obj)
        try{
            const response =  await axios.post('http://localhost:5000/signup',obj,{headers:{'Content-Type':'application/json'}})
            if(response.status===200){
              localStorage.setItem('token',response.data.token)
              toast.success('Successful Login');
              navigate('/home')
            } else if(response.status===400){
              toast.error('Invalid email or password');
          } else {
            throw new Error('Something went wrong');
          }
            }catch(err){
              console.log(err)
              toast.error("Something went wrong");
            }
    }

    const handleLogin=()=>{
        navigate('/login')
    }

    const handlePassword=()=>{
      navigate('/forgotpassword')
  }

  return (
    <React.Fragment>
        <form onSubmit={submitHandler}>
      <label htmlFor='name'>Name:</label>
      <input type='text' id='name' name='name'required value={name} onChange={(e)=>setName(e.target.value)}/>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Signup</button>
      </form>
      <button type='text' onClick={handleLogin}>Already a User? Login?</button>
      <ToastContainer/>
      <button type='text' onClick={handlePassword}>Forgot Password!</button>
      </React.Fragment>
  )
}

export default Login
