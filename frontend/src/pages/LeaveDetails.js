import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Example formatDate function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(); // Example formatting, adjust as per your requirements
};

const LeaveDetails = () => {
    const { authState } = useAuth(); // Get the authentication state
  const username = authState?.username || "Guest"; // Fetch the logged-in user's name
    const { id } = useParams(); // Get the leave ID from the URL
    const [leave, setLeave] = useState(null); // State to store leave details
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveDetails = async () => {
          try {
            console.log('Fetching leave details for ID:', id);
            const response = await axios.get(`http://localhost:3001/leave_details/${id}`);
            console.log('Leave Details:', response.data); // Log the response data
    
            // Map the API response fields to the form fields
            setLeave({
              class: response.data.class || '',
              e_no: response.data.e_no || '',
              student_name: response.data.student_name || '',
              section: response.data.section || '',
              leave_date: formatDate(response.data.leave_date) || '',
              status: response.data.status || '',
              reason: response.data.reason || '' // Include reason field
            });
            setLoading(false); // Set loading to false once data is fetched
          } catch (error) {
            console.error('Error fetching leave details:', error);
            Swal.fire('Error', `Failed to fetch leave details: ${error.message || 'Unknown error'}`, 'error');
          }
        };
        fetchLeaveDetails();
      }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
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
                        <h5>Leave Details</h5>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddLeave}>+ View List</button>
                    </div>
                            {leave ? (
                                <div>
                                    <p><strong>Enrollment Number:</strong> {leave.e_no}</p>
                                    <p><strong>Student Name:</strong> {leave.student_name}</p>
                                    <p><strong>Class:</strong> {leave.class}</p>
                                    <p><strong>Section:</strong> {leave.section}</p>
                                    <p><strong>Reason:</strong> {leave.reason}</p>
                                    <p><strong>Leave Date:</strong> {leave.leave_date}</p>
                                    <p><strong>Status:</strong> {leave.status}</p>
                                </div>
                            ) : (
                                <p>No details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetails;
