import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUsers, FaHandshake, FaStar } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Plan Your Perfect Event
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Connect with top vendors and create unforgettable experiences. From weddings to corporate events, we've got you covered.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose EventCursor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaCalendar className="h-8 w-8 text-indigo-600" />}
              title="Easy Planning"
              description="Streamlined event planning process with intuitive tools and features"
            />
            <FeatureCard
              icon={<FaUsers className="h-8 w-8 text-indigo-600" />}
              title="Top Vendors"
              description="Access to a curated network of professional and reliable vendors"
            />
            <FeatureCard
              icon={<FaHandshake className="h-8 w-8 text-indigo-600" />}
              title="Secure Booking"
              description="Safe and secure booking process with instant confirmation"
            />
            <FeatureCard
              icon={<FaStar className="h-8 w-8 text-indigo-600" />}
              title="Quality Service"
              description="Verified reviews and ratings to ensure the best service"
            />
          </div>
        </div>
      </div>

      {/* Event Types Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Event Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EventTypeCard
              image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3"
              title="Weddings"
              description="Create your dream wedding with our expert vendors"
            />
            <EventTypeCard
              image="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3"
              title="Corporate Events"
              description="Professional events that leave a lasting impression"
            />
            <EventTypeCard
              image="https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3"
              title="Private Parties"
              description="Celebrate special moments with style"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Planning Your Event?
          </h2>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300 inline-block"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EventCursor</h3>
              <p className="text-gray-400">Making event planning simple and enjoyable.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Wedding Planning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Corporate Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Private Parties</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: info@eventcursor.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventCursor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const EventTypeCard = ({ image, title, description }) => (
  <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Home; 