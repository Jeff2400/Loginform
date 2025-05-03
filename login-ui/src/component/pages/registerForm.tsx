import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';


const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    


    const handleChange = async (e: ChangeEvent<HTMLInputElement>)=> {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
      };
      
  
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        try {
          await axios.post('http://localhost:3000/api/auth/register', formData);
          setSuccessMsg('Registration successful');
          setFormData({ name: '', email: '', password: '', role: '' }); // Clear form
        } catch (err: any) {
          if (err.response?.data?.message) {
            setErrorMsg(err.response.data.message);
          } else if (err.message) {
            setErrorMsg(err.message); // e.g. "Network Error"
          } 
           else {
            setErrorMsg('Registration failed. Please try again.');
          }
        }
      };
      
  
      
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
        <h2>Create an account</h2>
        <input
         name="name" 
         value={formData.name} 
         onChange={handleChange} 
         required
          placeholder="Name"
           />
        <input
         name="email"
          type="email" 
          value={formData.email} 
          onChange={handleChange}
           required 
           placeholder="Email" 
           />
        <input 
        name="password" 
        type="password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
        placeholder="Password" 
        />
        <select 
        name="role"
         value={formData.role} 
         onChange={handleSelectChange}
          required 
          >
          <option value="" disabled hidden>select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {successMsg && <div className="alert success">{successMsg}</div>}
        {errorMsg && <div className="alert error">{errorMsg}</div>}

        <button type="submit">Register</button>
      </form>
      </div>
    );
  };
  


export default RegisterForm