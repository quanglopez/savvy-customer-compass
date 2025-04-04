import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types/user';
import { 
  MessageSquare, 
  BarChart3, 
  Bell, 
  Zap, 
  Shield, 
  Users,
  Mail
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
      title: 'Real-time Chat',
      description: 'Connect with your customers in real-time through a seamless chat interface.'
    },
    {
      icon: <Bell className="h-10 w-10 text-blue-500" />,
      title: 'Instant Notifications',
      description: 'Never miss a customer inquiry with our powerful notification system.'
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
      title: 'Analytics Dashboard',
      description: 'Gain valuable insights into customer conversations and behavior.'
    },
    {
      icon: <Mail className="h-10 w-10 text-blue-500" />,
      title: 'Email Notifications',
      description: 'Stay updated with email alerts for new messages and chat sessions.'
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: 'Lightning Fast',
      description: 'Our platform is built for speed, ensuring smooth communication.'
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security measures.'
    },
  ];

  const testimonials = [
    {
      quote: "Savvy Customer Compass transformed how we handle customer support. It's intuitive, fast, and our customers love it!",
      author: "Sarah Johnson",
      role: "Customer Support Manager",
      company: "TechSolutions Inc."
    },
    {
      quote: "The analytics dashboard gives us incredible insights into customer needs. We've improved our response time by 45%.",
      author: "Michael Chen",
      role: "Operations Director",
      company: "Global Retail Group"
    },
    {
      quote: "Setting up was a breeze. Within an hour, we were chatting with customers and providing better service than ever before.",
      author: "Emily Rodriguez",
      role: "Startup Founder",
      company: "InnovateCo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Savvy Customer Compass</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to={user.role === 'business' ? '/dashboard' : '/chat'}
                  className="px-4 py-2 rounded-md text-blue-600 font-medium hover:bg-blue-50"
                >
                  {user.role === 'business' ? 'Go to Dashboard' : 'Start Chatting'}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-blue-600 font-medium hover:bg-blue-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Connect with your customers like never before
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Savvy Customer Compass provides powerful chat tools to help businesses communicate effectively with their customers in real-time.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <Link
                  to="/register"
                  className="px-8 py-3 rounded-md bg-white text-blue-700 font-medium hover:bg-gray-100 text-center"
                >
                  Get Started
                </Link>
                <a
                  href="#features"
                  className="px-8 py-3 rounded-md border border-white text-white font-medium hover:bg-blue-500 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-500">Live Chat</div>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-3 bg-gray-100 rounded-lg py-2 px-3 max-w-xs">
                        <p className="text-sm text-gray-900">Hello! How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end">
                      <div className="bg-blue-500 rounded-lg py-2 px-3 max-w-xs">
                        <p className="text-sm text-white">I'm looking for information about your services.</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-700" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-3 bg-gray-100 rounded-lg py-2 px-3 max-w-xs">
                        <p className="text-sm text-gray-900">I'd be happy to provide more information. Our services include...</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full p-2 border rounded-md pr-10"
                      disabled
                    />
                    <button className="absolute right-2 top-2 text-blue-500">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Your Business
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to provide exceptional customer support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Businesses of all sizes are improving their customer communication with Savvy Customer Compass.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your customer support?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
            Join thousands of businesses already using Savvy Customer Compass.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="px-8 py-3 rounded-md bg-white text-blue-700 font-medium hover:bg-gray-100 inline-block"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">Savvy Customer Compass</span>
              </div>
              <p className="mt-4 text-gray-400">
                Helping businesses connect with their customers through powerful chat tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Use Cases</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 Savvy Customer Compass. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
