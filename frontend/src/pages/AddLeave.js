import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'; // Make sure this file has the necessary styles
import { useAuth } from '../AuthContext';

const AddLeave = () => {
    const { authState } = useAuth(); // Get the authentication state
  const username = authState?.username || "Guest"; // Fetch the logged-in user's name
    const [formData, setFormData] = useState({
        e_no: '',
        student_name: '',
        className: '', // Renamed from class to className
        section: '',
        reason: '',
        leave_date: '',
        status: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/leave_details', formData)
            .then(response => {
                navigate('/dashboard'); // Navigate back to the dashboard or wherever you want after adding
            })
            .catch(error => {
                setError('Error adding leave. Please try again.');
                console.error('Error adding leave:', error);
            });
    };

    
    const handleAddLeave = () => {
        navigate('/dashboard'); // Navigate to the Add Leave page
    };

    return (
        <div>
           <TopHeader username={username} />
            <div className="d-flex">
                <Sidebar />
                <div className="container content">
                <div className='card'>
                <div className='cardbody p-4'>
                    <div className="content-header">
                        <div className="d-flex align-items-center">
                        <h5>Add New Leave</h5>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddLeave}>+ View List</button>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Enrollment Number</label>
                            <input type="text" name="e_no" value={formData.e_no} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Student Name</label>
                            <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Class</label>
                            <input type="text" name="className" value={formData.className} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Section</label>
                            <input type="text" name="section" value={formData.section} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Reason</label>
                            <input type="text" name="reason" value={formData.reason} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Leave Date</label>
                            <input type="date" name="leave_date" value={formData.leave_date} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <input type="text" name="status" value={formData.status} onChange={handleChange} className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AddLeave;
