import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../pages/main.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="mb-4 sdh">
                <h5>John Doreamon</h5>
            </div>
            <Link to="#"><i className="fas fa-user-shield"></i> Go To Super Admin</Link>
            <Link to="#"><i className="fas fa-school"></i> My School</Link>
            <Link to="#"><i className="fas fa-cogs"></i> School Management</Link>

            <div className="mb-2 mt-2 sdh">
                <i className="fas fa-eye text-white"></i><span>Academics</span>
            </div>
            <div className="subs">
                <Link to="#"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                <Link to="#"><i className="fas fa-chalkboard-teacher"></i> Class</Link>
                <Link to="#"><i className="fas fa-users"></i> Sections</Link>
                <Link to="#"><i className="fas fa-book"></i> Subjects</Link>
                <Link to="#"><i className="fas fa-calendar-alt"></i> Time Table</Link>
                <Link to="#"><i className="fas fa-calendar-check"></i> Attendance</Link>
                <Link to="#"><i className="fas fa-user-clock"></i> Student Leave</Link>
                <Link to="#"><i className="fas fa-book-open"></i> Study Materials</Link>
                <Link to="#"><i className="fas fa-pencil-alt"></i> Homework</Link>
                <Link to="#"><i className="fas fa-bell"></i> Notice Board</Link>
                <Link to="#"><i className="fas fa-calendar"></i> Events</Link>
                <Link to="#"><i className="fas fa-video"></i> Live Classes <span className="badge badge-warning">Go Pro</span></Link>
            </div>
        </div>
    );
}

export default Sidebar;
