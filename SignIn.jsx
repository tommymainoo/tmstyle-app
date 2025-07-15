import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignIn = () => {
    const [username,setUsername] =useState('');
    const [password,setPassword]= useState('');

    const [success,setSuccess] = useState('');
    const [loading,setLoading]= useState('');
    const [error,setError]=useState('');
   

    const submit=async(e)=>{
        e.preventDefault();
        setLoading('Please Wait')

        try {
            const data = new FormData();
            data.append("username",username);
            data.append('password',password)

            const response = await axios.post(
              "https://tommymainoo.pythonanywhere.com/api/signin",
              data
            );
            setLoading('')
            setSuccess(response.data.message)

            
        } catch (error) {
            setLoading('')
            setError(error.response.data.message);
            
        }
    }
  return (
    <div className='row justify-content-center mt-3'>
        <div className='col-md-6 card shadow-lg'><br />
            <h3><b>Sign In</b></h3>
            <form action="" onSubmit={submit}>
                {success}
                {error}
                {loading}
                <input 
                type="text" 
                required 
                className='form-control' 
                placeholder='Username' 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
                /> <br />
                <input 
                type="password" 
                required 
                className='form-control' 
                placeholder='Password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                /><br />
                <button className='btn btn-primary' type='submit'>Sign In</button>
                <p><b>Dont have an account ?</b></p>
                <Link to='/signup'>Sign Up</Link>
                <br />
            </form>
            <br />

        </div>
    </div>
  )
}

export default SignIn;
