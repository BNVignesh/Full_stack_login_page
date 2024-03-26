import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './form.css'
import axios from 'axios'
const Register = () => {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate=useNavigate();
    function reg(event){
        event.preventDefault();
        
        axios.post('http://localhost:8088/register',values).then(res=>{if(res.data.Status==='success'){navigate('/login')}}).then(err=>{console.log(err)})
    }
    return (
        <div>
            <div className="form">
                <form onSubmit={reg}>
                    <h3>Registration</h3>
                    <div className="name">
                        <input type="text" placeholder='name' onInput={e=>setValues({...values,name:e.target.value})}/>
                    </div>
                    <div className="email">
                        <input type="email" placeholder='email' onInput={e=>setValues({...values,email:e.target.value})}/>
                    </div>
                    <div className="password">
                        <input type="text" placeholder='password' onInput={e=>setValues({...values,password:e.target.value})}/>
                    </div>
                    <button type='submit'>submit</button>
                    <Link to="/login" className='button' >login</Link>
                </form>
            </div>
        </div>
    )
}

export default Register
