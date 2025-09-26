

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSignup from './useSignup';

const SignupPage = () => {
  const name = useSignup('text');
  const email = useSignup('email');
  const password = useSignup('password');
  const phoneNumber = useSignup('tel');
  const gender = useSignup('text');
  const dateOfBirth = useSignup('date');
  const membershipStatus = useSignup('text');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
    };

    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const data = await res.json();
        // Store token so user is logged in immediately
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }

        toast.success('Signup Successful!');
        navigate('/jobs'); // redirect to jobs page after signup/login
      } else {
        const error = await res.json().catch(() => ({}));
        const message = error.error || error.message || 'Signup failed';
        toast.error(message);
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                {...name}
                className="border rounded w-full py-2 px-3"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                {...email}
                className="border rounded w-full py-2 px-3"
                placeholder="you@domain.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                {...password}
                className="border rounded w-full py-2 px-3"
                placeholder="Password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                {...phoneNumber}
                className="border rounded w-full py-2 px-3"
                placeholder="+1 555 555 5555"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender</label>
              <select
                {...gender}
                className="border rounded w-full py-2 px-3"
                value={gender.value}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                {...dateOfBirth}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Membership Status</label>
              <select
                {...membershipStatus}
                className="border rounded w-full py-2 px-3"
                value={membershipStatus.value}
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
