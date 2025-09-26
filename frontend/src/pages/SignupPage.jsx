import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = ({ signupSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('Free');

  const navigate = useNavigate();

//   const submitForm = (e) => {
//     e.preventDefault();

//     const newUser = {
//       name,
//       email,
//       password,
//       phone_number: phoneNumber,
//       gender,
//       date_of_birth: dateOfBirth,
//       membership_status: membershipStatus,
//     };

//     signupSubmit(newUser);

//     toast.success('Signup Successful!');
//     navigate('/login');
//   };

const submitForm = async (e) => {
  e.preventDefault();

  const newUser = {
    name,
    email,
    password,
    phone_number: phoneNumber,
    gender,
    date_of_birth: dateOfBirth,
    membership_status: membershipStatus,
  };

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      toast.success('Signup Successful!');
      navigate('/login'); // redirect after success
    } else {
      const error = await res.json();
      toast.error(error.message || 'Signup failed');
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
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                className="border rounded w-full py-2 px-3"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                className="border rounded w-full py-2 px-3"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Membership Status</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={membershipStatus}
                onChange={(e) => setMembershipStatus(e.target.value)}
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
