import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MedicineInventory from './pages/home/medicineinventory';
import Prescriptions from './pages/home/prescriptions';
import Profile from './pages/home/profile'; 
import Settings from './pages/home/setting'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicine-inventory" element={<MedicineInventory />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/settings" element={<Settings />} /> 
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;