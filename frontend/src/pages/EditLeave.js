import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';

const EditLeave = () => {
  const { id } = useParams(); // Get the leave ID from URL params
  const navigate = useNavigate();
  const { authState } = useAuth(); // Get the authentication state
  const username = authState?.username || "Guest"; // Fetch the logged-in user's name

  const [leaveDetails, setLeaveDetails] = useState({
    class: '',
    e_no: '',
    student_name: '',
    section: '',
    leave_date: '',
    status: '',
    reason: '' // Include reason field
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        console.log('Fetching leave details for ID:', id);
        const response = await axios.get(`http://localhost:3001/leave_details/${id}`);
        console.log('Leave Details:', response.data); // Log the response data

        // Map the API response fields to the form fields
        setLeaveDetails({
          class: response.data.class || '',
          e_no: response.data.e_no || '',
          student_name: response.data.student_name || '',
          section: response.data.section || '',
          leave_date: formatDate(response.data.leave_date) || '',
          status: response.data.status || '',
          reason: response.data.reason || '' // Include reason field
        });
      } catch (error) {
        console.error('Error fetching leave details:', error);
        Swal.fire('Error', `Failed to fetch leave details: ${error.message || 'Unknown error'}`, 'error');
      }
    };
    fetchLeaveDetails();
  }, [id]);

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setLeaveDetails({
      ...leaveDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/leave_details/${id}`, leaveDetails);
      Swal.fire('Success', 'Leave details updated successfully', 'success').then(() => {
        navigate('/dashboard'); // Redirect after successful update
      });
    } catch (error) {
      console.error('Error updating leave details:', error);
      Swal.fire('Error', `Failed to update leave details: ${error.message || 'Unknown error'}`, 'error');
    }
  };

  const handleAddLeave = () => {
    navigate('/dashboard'); // Navigate to the Add Leave page
};

  return (
    <div>
      <TopHeader username={username} />
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          <div className='card'>
            <div className='cardbody p-4'>
            <div className="content-header">
                        <div className="d-flex align-items-center">
                        <h5>Edit Studen Leave</h5>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddLeave}>+ View List</button>
                    </div>
              <div className="edit-leave-container">
                <div className="edit-leave-form">
                  <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="form-group">
                      <label htmlFor="class">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        id="class"
                        name="class"
                        placeholder="Enter class"
                        value={leaveDetails.class}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="e_no">Employee Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="e_no"
                        name="e_no"
                        placeholder="Enter employee number"
                        value={leaveDetails.e_no}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="student_name">Student Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="student_name"
                        name="student_name"
                        placeholder="Enter student name"
                        value={leaveDetails.student_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="section">Section</label>
                      <input
                        type="text"
                        className="form-control"
                        id="section"
                        name="section"
                        placeholder="Enter section"
                        value={leaveDetails.section}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="leave_date">Leave Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="leave_date"
                        name="leave_date"
                        value={leaveDetails.leave_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={leaveDetails.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="reason">Reason</label>
                      <input
                        type="text"
                        className="form-control"
                        id="reason"
                        name="reason"
                        placeholder="Enter reason"
                        value={leaveDetails.reason}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-warning btn-block mt-3">Update Leave</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeave;
