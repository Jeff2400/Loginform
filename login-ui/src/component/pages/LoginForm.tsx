import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', formData);
            alert(`Login Successful! Role: ${res.data.role}`);
        } catch (err: any) {
            alert(err.response?.data || 'An error occurred');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p>Forgot password?</p>
                <button type="submit">Login</button>
                <p>
                  Don't have account? <Link to="/register">Register</Link>.
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
