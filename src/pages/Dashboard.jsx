import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const stats = [
    { name: 'Total Medicines', value: 80870 },
    { name: 'Total Prescriptions', value: 4490 },
    { name: 'Active Pharmacies', value: 3409 },
    { name: 'Pending Orders', value: 90234 }
  ];

  const salesData = [40, 30, 60, 25, 35, 45];
  const stockLevels = [
    { name: 'Antibiotics - Blue' },
    { name: 'Painkillers - Red' },
    { name: 'Antacids - Green' },
    { name: 'Vitamins - Purple' }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4 cursor-pointer hover:text-red-400">Pharmacy Management</li>
              <li className="mb-4 cursor-pointer hover:text-red-400">Medicine Inventory</li>
              <li className="mb-4 cursor-pointer hover:text-red-400">Prescriptions</li>
              <li className="mb-4 cursor-pointer hover:text-red-400">Analytics</li>
              <li className="cursor-pointer hover:text-red-400">Settings</li>
            </ul>
          </nav>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4">
          Logout
        </button>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search" className="border p-2 rounded-lg" />
            <span className="text-yellow-500 text-xl">🔔</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">Admin</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold">{stat.name}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Sales Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Sales Trends Chart</h2>
          <div className="flex justify-between gap-2">
            {salesData.map((height, idx) => (
              <div
                key={`sales-${idx}`}
                className={clsx("flex-1 rounded-md", {
                  'bg-red-500': height === 60,
                  'bg-red-300': height !== 60
                })}
                style={{ height: `${height}px` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Stock Levels Pie Chart */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Stock Levels</h2>
            <div className="w-40 h-40 bg-green-300 rounded-full mx-auto"></div>
          </div>
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <ul>
              {stockLevels.map((item) => (
                <li key={item.name} className="mb-2">{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
