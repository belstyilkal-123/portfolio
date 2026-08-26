import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { Login } from './admin/Login';
import { Register } from './admin/Register';
import { ForgotPassword } from './admin/ForgotPassword';
import { ResetPassword } from './admin/ResetPassword';
import { ManageProjects } from './admin/ManageProjects';
import { ManageMessages } from './admin/ManageMessages';
import { AdminSettings } from './admin/Settings';
import { Analytics } from './admin/Analytics';
import { ManageBlog } from './admin/ManageBlog';
import { ManageSkills } from './admin/ManageSkills';
import { ManageResume } from './admin/ManageResume';
import { ManageProfile } from './admin/ManageProfile';
import { MediaLibrary } from './admin/MediaLibrary';
import { Notifications } from './admin/Notifications';
import { ManageExperience } from './admin/ManageExperience';
import { ManageEducation } from './admin/ManageEducation';
import { ManageCertificates } from './admin/ManageCertificates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="blog" element={<ManageBlog />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="resume" element={<ManageResume />} />
        <Route path="profile" element={<ManageProfile />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="certificates" element={<ManageCertificates />} />
      </Route>
    </Routes>
  );
}

export default App;
