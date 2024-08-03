import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { authState } = useAuth(); // Get the authentication state
    const username = authState?.username || "Guest"; // Fetch the logged-in user's name
    const [leaveDetails, setLeaveDetails] = useState([]); // State to store leave details
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(''); // Default selected month (empty means no filter)
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:3001/leave_details')
            .then(response => {
                setLeaveDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching leave details:', error);
            });
    }, []);

    // Extract the month from the leave_date and filter based on search term and selected month
    const filteredLeaveDetails = leaveDetails.filter((leave) => {
        const leaveMonth = new Date(leave.leave_date).getMonth() + 1; // Get month from leave_date (0-indexed)
        const matchesSearchTerm = leave.student_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = selectedMonth ? leaveMonth === parseInt(selectedMonth) : true; // If no month is selected, include all months
        return matchesSearchTerm && matchesMonth;
    });

    const handleAddLeave = () => {
        navigate('/add-leave'); // Navigate to the Add Leave page
    };

    const handleEditClick = (id) => {
        navigate(`/edit-leave/${id}`); // Navigate to the edit page
    };

    const handleViewClick = (id) => {
        navigate(`/leave-details/${id}`); // Navigate to the leave details page
    };

    return (
        <div>
            <TopHeader username={username} />
            <div className="d-flex">
                <Sidebar />
                <div className="content">
                    <div className='card'>
                        <div className='card-body p-4'>
                            <div className="content-header">
                                <div>
                                    <h5>Student Leaves</h5>
                                </div>
                            </div>
                            <div className="content-header">
                                <div className="d-flex align-items-center">
                                    <select
                                        className="form-control mr-3"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        <option value="">All Months</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                        {/* Add other month options dynamically if needed */}
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Student"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={handleAddLeave}>
                                    + Add New Leave
                                </button>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Enrollment Number</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Section</th>
                                        <th>Reason</th>
                                        <th>Leave Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeaveDetails.map((leave) => (
                                        <tr key={leave.e_no}>
                                            <td>{leave.e_no}</td>
                                            <td>{leave.student_name}</td>
                                            <td>{leave.class}</td>
                                            <td>{leave.section}</td>
                                            <td>{leave.reason}</td>
                                            <td>{leave.leave_date}</td>
                                            <td>{leave.status}</td>
                                            <td>
                                                <i className="fas fa-eye" onClick={() => handleViewClick(leave.id)}></i>
                                                <i className="fas fa-edit ml-3" onClick={() => handleEditClick(leave.id)}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
