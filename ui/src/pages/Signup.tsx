import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new user account
    // For now, just redirect to the documents page
    //navigate("/documents");
    alert('Not implemented yet.')
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold gradient-text">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Start managing your documents today</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {/* Keep existing form fields */}

          {/* Update the submit button with the handleSignup handler */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white button-gradient focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
