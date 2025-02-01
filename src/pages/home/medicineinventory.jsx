import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  AdjustmentsHorizontalIcon,
  ExclamationCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const MedicineInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isAddMedicineModalOpen, setIsAddMedicineModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    expiryDate: '',
    manufacturer: '',
    status: 'In Stock',
  });

  // Sample data - replace with actual API call
  const [medicines, setMedicines] = useState([
    { 
      id: 1, 
      name: 'Amoxicillin', 
      category: 'Antibiotics',
      stock: 2500,
      price: 12.99,
      expiryDate: '2024-12-31',
      manufacturer: 'PharmaCorp',
      status: 'In Stock',
    },
    { 
      id: 2, 
      name: 'Ibuprofen', 
      category: 'Pain Relief',
      stock: 150,
      price: 8.99,
      expiryDate: '2024-10-15',
      manufacturer: 'MediCare',
      status: 'Low Stock',
    },
    // Add more sample data here
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'expiring-soon', label: 'Expiring Soon' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'pain-relief', label: 'Pain Relief' },
  ];

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    const sorted = [...medicines].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted.filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === 'all' || medicine.category.toLowerCase().includes(selectedFilter))
    );
  };

  const getStockStatus = (stock) => {
    if (stock <= 200) return 'bg-red-100 text-red-800';
    if (stock <= 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleAddMedicine = () => {
    setIsAddMedicineModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddMedicineModalOpen(false);
    setNewMedicine({
      name: '',
      category: '',
      stock: '',
      price: '',
      expiryDate: '',
      manufacturer: '',
      status: 'In Stock',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = medicines.length + 1;
    const medicineToAdd = { ...newMedicine, id: newId, stock: parseInt(newMedicine.stock), price: parseFloat(newMedicine.price) };
    setMedicines([...medicines, medicineToAdd]);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Medicine Inventory</h1>
        <p className="text-gray-600">Manage and track your pharmaceutical inventory</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white flex-grow md:flex-grow-0 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button 
              onClick={handleAddMedicine}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="hidden md:inline">Add Medicine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Items', value: '2,534', change: '+12%', color: 'blue' },
          { title: 'Low Stock Items', value: '45', change: '-2%', color: 'red' },
          { title: 'Expiring Soon', value: '128', change: '+5%', color: 'yellow' },
          { title: 'Out of Stock', value: '23', change: '-8%', color: 'gray' },
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${
                stat.change.startsWith('+') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: 'name', label: 'Medicine Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'stock', label: 'Stock' },
                  { key: 'price', label: 'Price' },
                  { key: 'expiryDate', label: 'Expiry Date' },
                  { key: 'manufacturer', label: 'Manufacturer' },
                  { key: 'status', label: 'Status' },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {sortConfig.key === column.key && (
                        sortConfig.direction === 'asc' ? 
                          <ArrowUpIcon className="w-4 h-4 text-blue-500" /> : 
                          <ArrowDownIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getSortedData().map((medicine) => (
                <tr 
                  key={medicine.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{medicine.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStockStatus(medicine.stock)}`}>
                      {medicine.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${medicine.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{medicine.expiryDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{medicine.manufacturer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      medicine.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {medicine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {isAddMedicineModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Medicine</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newMedicine.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newMedicine.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={newMedicine.stock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={newMedicine.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={newMedicine.expiryDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={newMedicine.manufacturer}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newMedicine.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineInventory;