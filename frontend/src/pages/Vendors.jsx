import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Vendors = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Vendors' },
    { id: 'catering', name: 'Catering' },
    { id: 'decoration', name: 'Decoration' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'photography', name: 'Photography' },
    { id: 'venue', name: 'Venue' }
  ];

  const vendors = [
    {
      id: 1,
      name: 'Elite Catering Services',
      category: 'catering',
      rating: 4.8,
      reviews: 156,
      location: 'New York, NY',
      description: 'Professional catering services for all types of events with customizable menus.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3',
      priceRange: '$$$',
      contact: {
        phone: '(555) 123-4567',
        email: 'contact@elitecatering.com'
      }
    },
    {
      id: 2,
      name: 'Dream Decorators',
      category: 'decoration',
      rating: 4.9,
      reviews: 203,
      location: 'Los Angeles, CA',
      description: 'Creative and elegant decoration services for weddings and special events.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3',
      priceRange: '$$',
      contact: {
        phone: '(555) 234-5678',
        email: 'info@dreamdecorators.com'
      }
    },
    {
      id: 3,
      name: 'Sound & Light Productions',
      category: 'entertainment',
      rating: 4.7,
      reviews: 189,
      location: 'Chicago, IL',
      description: 'Professional sound and lighting services for events of all sizes.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
      priceRange: '$$$',
      contact: {
        phone: '(555) 345-6789',
        email: 'book@soundlight.com'
      }
    },
    {
      id: 4,
      name: 'Capture Moments Photography',
      category: 'photography',
      rating: 4.9,
      reviews: 245,
      location: 'San Francisco, CA',
      description: 'Professional photography services capturing your special moments.',
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3',
      priceRange: '$$',
      contact: {
        phone: '(555) 456-7890',
        email: 'info@capturemoments.com'
      }
    }
  ];

  const filteredVendors = selectedCategory === 'all'
    ? vendors
    : vendors.filter(vendor => vendor.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Find Top Vendors</h1>
          <p className="text-xl text-center text-gray-100 max-w-2xl mx-auto">
            Connect with professional vendors for your event. From catering to decoration, we have the best in the business.
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

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map(vendor => (
            <div
              key={vendor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
                  <span className="text-sm font-medium text-gray-500">{vendor.priceRange}</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(vendor.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-2" />
                    <span>{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" />
                    <span>{vendor.contact.email}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Contact Vendor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendors; 