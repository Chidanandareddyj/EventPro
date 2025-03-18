import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    completedEvents: 0
  });

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch your actual data here
        setStats({
          totalBookings: 12,
          upcomingEvents: 5,
          completedEvents: 7
        });
        
        // Sample booking data for demonstration
        setBookings([
          {
            eventType: "Wedding Ceremony",
            location: "Grand Hotel, New York",
            date: "2023-12-15",
            status: "confirmed"
          },
          {
            eventType: "Corporate Meeting",
            location: "Business Center",
            date: "2023-11-20",
            status: "pending"
          },
          {
            eventType: "Birthday Party",
            location: "Sunset Beach Resort",
            date: "2023-12-05",
            status: "confirmed"
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-gray-500 text-sm md:text-base font-medium">{title}</p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{value}</h3>
          </div>
          <div className={`p-3 md:p-4 rounded-full ${color} transform rotate-0 hover:rotate-12 transition-transform duration-300`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-gray-900 text-lg">{booking.eventType}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"></span>
            {booking.location}
          </p>
          <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Client Dashboard</h1>
            </div>
            <div className="flex items-center">
              <Link
                to="/search-vendors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all duration-300"
              >
                <FaSearch className="mr-2 h-4 w-4" />
                Find Vendors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <StatCard
            icon={FaCalendarAlt}
            title="Total Bookings"
            value={stats.totalBookings}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            icon={FaClock}
            title="Upcoming Events"
            value={stats.upcomingEvents}
            color="bg-gradient-to-r from-yellow-400 to-yellow-500"
          />
          <StatCard
            icon={FaCheckCircle}
            title="Completed Events"
            value={stats.completedEvents}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              path: 'search-vendors',
              title: 'Find Perfect Vendor',
              description: 'Browse through our curated list of professional vendors',
              gradient: 'from-indigo-500 via-purple-500 to-pink-500'
            },
            {
              path: 'create-event',
              title: 'Plan New Event',
              description: 'Start planning your next amazing event',
              gradient: 'from-cyan-500 via-blue-500 to-indigo-500'
            },
            {
              path: 'chat',
              title: 'Message Vendors',
              description: 'Communicate with your vendors directly',
              gradient: 'from-emerald-500 via-green-500 to-teal-500'
            }
          ].map((action, index) => (
            <Link
              key={action.path}
              to={`/${action.path}`}
              className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-r ${action.gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl`}>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bookings Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-5 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg self-start">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BookingCard booking={booking} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No {activeTab} events found.</p>
              <Link to="/search-vendors" className="mt-4 inline-block text-indigo-600 font-medium">
                Start planning a new event
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;