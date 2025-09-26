import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = ({ loginSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                // store token to localStorage
                localStorage.setItem('authToken', data.token);
                toast.success('Login Successful!');
                navigate('/jobs'); // redirect after login
            } else {
                const error = await res.json();
                toast.error(error.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            toast.error('Server error. Please try again.');
        }
    };


    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-md py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

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

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
