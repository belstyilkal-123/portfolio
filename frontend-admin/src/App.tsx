import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { Login } from './admin/Login';
import { Register } from './admin/Register';
import { ManageProjects } from './admin/ManageProjects';
import { ManageMessages } from './admin/ManageMessages';
import { AdminSettings } from './admin/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
