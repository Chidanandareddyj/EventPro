import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaChartBar, FaStar, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState({
    name: '',
    description: '',
    services: [],
    priceRange: { min: '', max: '' },
    location: '',
    eventTypes: []
  });
  const [newService, setNewService] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedEvents: 0,
    upcomingEvents: 0,
    averageRating: 0
  });
  const [activeTab, setActiveTab] = useState('upcoming');

  const eventTypes = [
    { id: 'wedding', name: 'Wedding' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'party', name: 'Party' }
  ];

  useEffect(() => {
    fetchVendorData();
    fetchBookings();
    const fetchDashboardData = async () => {
      try {
        // Fetch your actual data here
        setStats({
          totalBookings: 45,
          completedEvents: 32,
          upcomingEvents: 13,
          averageRating: 4.8
        });
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:5000/api/vendors/${user._id}`);
      setVendorData(response.data);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:5000/api/bookings/vendor/${user._id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setVendorData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setVendorData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEventTypeChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setVendorData(prev => ({
      ...prev,
      eventTypes: value
    }));
  };

  const addService = () => {
    if (newService.trim()) {
      setVendorData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (index) => {
    setVendorData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`http://localhost:5000/api/vendors/${user._id}`, vendorData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile');
    }
    setLoading(false);
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-gray-500 text-sm md:text-base font-medium">{title}</p>
            <h3 className="text-2xl md:text-3xl font-bold animate-fade-in">{value}</h3>
          </div>
          <div className={`p-3 md:p-4 rounded-full ${color} transform rotate-0 hover:rotate-12 transition-transform duration-300`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{booking.eventType}</h3>
          <p className="text-sm text-gray-500">{booking.location}</p>
          <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {booking.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg backdrop-blur-lg bg-opacity-80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 animate-fade-in">
                Vendor Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            icon={FaCalendarAlt}
            title="Total Bookings"
            value={stats.totalBookings}
            color="bg-blue-500"
          />
          <StatCard
            icon={FaChartBar}
            title="Completed Events"
            value={stats.completedEvents}
            color="bg-green-500"
          />
          <StatCard
            icon={FaClock}
            title="Upcoming Events"
            value={stats.upcomingEvents}
            color="bg-yellow-500"
          />
          <StatCard
            icon={FaStar}
            title="Average Rating"
            value={stats.averageRating}
            color="bg-purple-500"
          />
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 backdrop-blur-lg bg-opacity-90">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Your Bookings</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-indigo-100 text-indigo-700 transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'completed'
                    ? 'bg-indigo-100 text-indigo-700 transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:scale-102 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BookingCard booking={booking} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Add these styles to your global CSS or create a new styles file
const styles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}
`;

export default VendorDashboard;