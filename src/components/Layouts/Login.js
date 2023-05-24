import React,{useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const emailChangeHandler=(e)=>{
        setEmail(e.target.value)
    }
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value)
    }

    const submitHandler= async (e)=>{
        e.preventDefault()
        const obj={
            email,
            password
        }
        console.log(obj)
        try{
        const response = await axios.post('http://localhost:5000/login',obj,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.status === 200){
          localStorage.setItem('token',response.data.token)
            toast.success("Login Successfull")
            navigate('/home')
        }
         else throw new Error('Something went wrong')
    }catch(err){
            if (err.response && err.response.status === 404) {
              toast.error('No user found');
            } else if (err.response && err.response.status === 400) {
              toast.error('Invalid email or password');
            } else if (err.response && err.response.status === 401) {
              toast.error('Wrong password');
            } else {
              toast.error(err.message || 'Something went wrong');
            }
          }
    }
    const handleLogin=()=>{
        navigate('/')
    }

    const handlePassword=()=>{
      navigate('/forgotpassword')
  }

  return (
    <React.Fragment>    
        <form onSubmit={submitHandler}>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required value={email} onChange={emailChangeHandler}/>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' required  value={password} onChange={passwordChangeHandler}/>
      <button type='submit'>Login</button>
      </form>
      <button type='text' onClick={handleLogin}>New User? SignUp!</button>
      <ToastContainer/>
      <button type='text' onClick={handlePassword}>Forgot Password!</button>
      </React.Fragment>
  )
}

export default Login
