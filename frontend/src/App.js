import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import EditLeave from './pages/EditLeave';
import AddLeave from './pages/AddLeave';
import LeaveDetails from './pages/LeaveDetails';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/edit-leave/:id" element={<EditLeave />} />
          <Route path="/leave-details/:id" element={<LeaveDetails />} />
          <Route path="/add-leave" element={<AddLeave />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
