import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'party', name: 'Parties' },
    { id: 'conference', name: 'Conferences' }
  ];

  const events = [
    {
      id: 1,
      title: 'Summer Wedding Festival',
      category: 'wedding',
      date: '2024-06-15',
      time: '2:00 PM',
      location: 'Grand Hotel, New York',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      category: 'conference',
      date: '2024-07-20',
      time: '9:00 AM',
      location: 'Convention Center, San Francisco',
      price: '$499',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3'
    },
    {
      id: 3,
      title: 'Corporate Team Building',
      category: 'corporate',
      date: '2024-08-05',
      time: '10:00 AM',
      location: 'Business Center, Chicago',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3'
    },
    {
      id: 4,
      title: 'New Year Celebration',
      category: 'party',
      date: '2024-12-31',
      time: '8:00 PM',
      location: 'City Center, Los Angeles',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3'
    }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Discover Amazing Events</h1>
          <p className="text-xl text-center text-gray-100 max-w-2xl mx-auto">
            Find and book the perfect event for your special occasion. From weddings to corporate events, we've got you covered.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaTicketAlt className="mr-2" />
                    <span className="font-semibold text-indigo-600">{event.price}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events; 