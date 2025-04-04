import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 sm:mr-8">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-6 flex space-x-4 justify-center sm:justify-start">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Home className="h-4 w-4 mr-2" />
                Go back home
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}; 