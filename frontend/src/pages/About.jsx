import React from 'react';
import { FaUsers, FaHandshake, FaStar, FaCalendarAlt } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaUsers className="w-12 h-12 text-indigo-600" />,
      title: 'Our Community',
      description: 'Join a thriving community of event planners, vendors, and clients who share a passion for creating memorable experiences.'
    },
    {
      icon: <FaHandshake className="w-12 h-12 text-indigo-600" />,
      title: 'Trusted Partners',
      description: 'We carefully vet and partner with the best vendors in the industry to ensure quality service for every event.'
    },
    {
      icon: <FaStar className="w-12 h-12 text-indigo-600" />,
      title: 'Quality Service',
      description: 'Our commitment to excellence ensures that every event meets the highest standards of quality and professionalism.'
    },
    {
      icon: <FaCalendarAlt className="w-12 h-12 text-indigo-600" />,
      title: 'Easy Planning',
      description: 'Streamlined event planning process with intuitive tools and features to make your event planning journey smooth.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">About EventCursor</h1>
          <p className="text-xl text-center text-gray-100 max-w-2xl mx-auto">
            We're on a mission to revolutionize event planning by connecting people with the best vendors and creating unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2024, EventCursor emerged from a simple observation: event planning needed to be simpler, more efficient, and more accessible. We set out to create a platform that would connect event planners with the best vendors while providing tools to streamline the entire planning process.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of clients and vendors across the country, helping them create memorable events that leave lasting impressions.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3"
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-xl text-gray-600 text-center">
              To empower event planners and vendors with innovative tools and connections, making event planning accessible, efficient, and enjoyable for everyone.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3'
              },
              {
                name: 'Jane Smith',
                role: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3'
              },
              {
                name: 'Mike Johnson',
                role: 'Technical Lead',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 