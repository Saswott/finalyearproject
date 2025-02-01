import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon, ChartBarIcon, CubeIcon, ClipboardDocumentIcon, CogIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const navItems = [
    { name: 'Pharmacy Management', path: '/pharmacyManagement', icon: <CubeIcon className="w-6 h-6" /> },
    { name: 'Medicine Inventory', path: '/medicine-inventory', icon: <ClipboardDocumentIcon className="w-6 h-6" /> },
    { name: 'Prescriptions', path: '/prescriptions', icon: <ChartBarIcon className="w-6 h-6" /> },
    { name: 'Analytics', path: '/analytics', icon: <ChartBarIcon className="w-6 h-6" /> },
    { name: 'Settings', path: '/settings', icon: <CogIcon className="w-6 h-6" /> }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const stats = [
    { id: 1, name: 'Total Medicines', value: 80870, icon: '💊', color: 'text-blue-500' },
    { id: 2, name: 'Total Prescriptions', value: 4490, icon: '📄', color: 'text-green-500' },
    { id: 3, name: 'Active Pharmacies', value: 3409, icon: '🏥', color: 'text-purple-500' },
    { id: 4, name: 'Pending Orders', value: 90234, icon: '🛒', color: 'text-red-500' }
  ];

  const salesData = [40, 30, 60, 25, 35, 45];

  const stockLevels = [
    { id: 1, name: 'Antibiotics', color: 'bg-blue-500' },
    { id: 2, name: 'Painkillers', color: 'bg-red-500' },
    { id: 3, name: 'Antacids', color: 'bg-green-500' },
    { id: 4, name: 'Vitamins', color: 'bg-purple-500' }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col justify-between backdrop-blur-lg bg-opacity-80">
        <div>
          <h2 className="text-2xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
            Dashboard
          </h2>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li 
                  key={item.name} 
                  onClick={() => navigate(item.path)}
                  className="mb-4 cursor-pointer hover:text-red-400 text-lg font-semibold transition-colors duration-300 hover:bg-gray-700 p-2 rounded-lg flex items-center gap-3"
                >
                  {item.icon}
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Logout
        </button>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin! 👋</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search" 
                className="border p-3 rounded-lg pl-10 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            </div>
            <BellIcon className="w-7 h-7 text-yellow-500 cursor-pointer hover:text-yellow-600 transition-colors duration-300" />
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate('/profile')} // Navigate to Profile page
            >
              <span className="font-bold text-gray-700">Admin</span>
              <UserCircleIcon className="w-10 h-10 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
            </div>
          </div>
        </header>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-80"
            >
              <span className={`text-4xl ${stat.color}`}>{stat.icon}</span>
              <h3 className="text-lg font-semibold text-gray-700 mt-2">{stat.name}</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        
        {/* Sales Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 backdrop-blur-sm bg-opacity-80">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Trends 📈</h2>
          <div className="flex items-end justify-between h-60 gap-2">
            {salesData.map((height, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t-md transition-all duration-300 ${
                  height === 60 ? 'bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900' : 'bg-gradient-to-b from-blue-300 to-blue-500 hover:from-blue-500 hover:to-blue-700'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <span key={idx} className="text-sm">{day}</span>
            ))}
          </div>
        </div>
        
        {/* Stock Levels */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Stock Levels 📦</h2>
            <div className="w-40 h-40 relative rounded-full mx-auto overflow-hidden">
              {stockLevels.map((item, index) => (
                <div 
                  key={item.id}
                  className={`absolute w-full h-full ${item.color}`}
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                    transform: `rotate(${index * 90}deg)`
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Legend</h2>
            <ul className="space-y-2">
              {stockLevels.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${item.color}`} />
                  <span className="text-lg font-medium text-gray-700">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;