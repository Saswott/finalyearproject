import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState({
    id: null,
    patient: '',
    date: '',
    medications: [''],
    status: 'Pending',
    doctor: ''
  });
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('prescriptions');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        patient: "John Doe",
        date: "2023-08-15",
        medications: ["Amoxicillin 500mg", "Ibuprofen 200mg"],
        status: "Pending",
        doctor: "Dr. Sarah Johnson"
      },
      {
        id: 2,
        patient: "Jane Smith",
        date: "2023-08-14",
        medications: ["Paracetamol 500mg", "Vitamin C 1000mg"],
        status: "Completed",
        doctor: "Dr. Michael Chen"
      }
    ];
  });

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setSelectedFilter(e.target.value);

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm) ||
                         prescription.doctor.toLowerCase().includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || 
                        prescription.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const openModal = (prescription = null) => {
    if (prescription) {
      setEditMode(true);
      setCurrentPrescription({
        ...prescription,
        medications: [...prescription.medications]
      });
    } else {
      setEditMode(false);
      setCurrentPrescription({
        id: null,
        patient: '',
        date: '',
        medications: [''],
        status: 'Pending',
        doctor: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'medications') {
      const newMedications = [...currentPrescription.medications];
      newMedications[index] = value;
      setCurrentPrescription({ ...currentPrescription, medications: newMedications });
    } else {
      setCurrentPrescription({ ...currentPrescription, [name]: value });
    }
  };

  const addMedicationField = () => {
    setCurrentPrescription({
      ...currentPrescription,
      medications: [...currentPrescription.medications, '']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrescription = {
      ...currentPrescription,
      id: editMode ? currentPrescription.id : prescriptions.length + 1,
      medications: currentPrescription.medications.filter(med => med.trim() !== '')
    };

    if (editMode) {
      setPrescriptions(prescriptions.map(p => 
        p.id === currentPrescription.id ? newPrescription : p
      ));
    } else {
      setPrescriptions([...prescriptions, newPrescription]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      setPrescriptions(prescriptions.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Prescription Management</h1>
        <p className="text-gray-600">Manage and track all patient prescriptions</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <option value="all">All Prescriptions</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button 
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="hidden md:inline">New Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Prescriptions', value: prescriptions.length, change: '+8%', color: 'blue' },
          { title: 'Pending', value: prescriptions.filter(p => p.status === 'Pending').length, change: '-2%', color: 'yellow' },
          { title: 'Completed', value: prescriptions.filter(p => p.status === 'Completed').length, change: '+12%', color: 'green' },
          { title: 'Today', value: prescriptions.filter(p => p.date === new Date().toISOString().split('T')[0]).length, change: '', color: 'purple' },
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              {stat.change && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  stat.change.startsWith('+') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Patient', 'Date', 'Medications', 'Status', 'Doctor', 'Actions'].map((header, index) => (
                  <th 
                    key={index}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-8 w-8 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {prescription.patient}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {new Date(prescription.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1 max-w-[300px]">
                      {prescription.medications.map((med, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusStyles[prescription.status]
                    }`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prescription.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openModal(prescription)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(prescription.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editMode ? 'Edit Prescription' : 'New Prescription'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patient"
                    value={currentPrescription.patient}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="doctor"
                    value={currentPrescription.doctor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={currentPrescription.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentPrescription.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medications
                </label>
                {currentPrescription.medications.map((medication, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Medication name and dosage"
                      required
                    />
                    {index === currentPrescription.medications.length - 1 && (
                      <button
                        type="button"
                        onClick={addMedicationField}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editMode ? 'Update' : 'Create'} Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;