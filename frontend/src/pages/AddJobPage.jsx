
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJobPage = ({ refreshJobs }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('Under $50K');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    // ✅ use the same key as login/signup
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You must be logged in to add a job');
      return;
    }

    const newJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ correct header
        },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        toast.success('Job Added Successfully');
        if (refreshJobs) refreshJobs();
        navigate('/jobs');
      } else {
        const error = await res.json().catch(() => ({}));
        const message = error.error || error.message || 'Failed to add job';
        toast.error(message);
      }
    } catch (err) {
      console.error('Error submitting job:', err);
      toast.error('Network/Server error, please try again');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Job</h2>

            {/* Job Type */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Job Type</label>
              <select
                className='border rounded w-full py-2 px-3'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            {/* Job Title */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Job Listing Name</label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Software Engineer'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Description</label>
              <textarea
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add job duties, expectations, requirements, etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Salary */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Salary</label>
              <select
                className='border rounded w-full py-2 px-3'
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value='Under $50K'>Under $50K</option>
                <option value='$50K - 60K'>$50K - $60K</option>
                <option value='$60K - 70K'>$60K - $70K</option>
                <option value='$70K - 80K'>$70K - $80K</option>
                <option value='$80K - 90K'>$80K - $90K</option>
                <option value='$90K - 100K'>$90K - $100K</option>
                <option value='$100K - 125K'>$100K - $125K</option>
                <option value='$125K - 150K'>$125K - $150K</option>
                <option value='$150K - 175K'>$150K - $175K</option>
                <option value='$175K - 200K'>$175K - $200K</option>
                <option value='Over $200K'>Over $200K</option>
              </select>
            </div>

            {/* Location */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Location</label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            {/* Company Name */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Company Name</label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3'
                placeholder='Company Name'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* Company Description */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Company Description</label>
              <textarea
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='What does your company do?'
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
            </div>

            {/* Contact Email */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Contact Email</label>
              <input
                type='email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address for applicants'
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            {/* Contact Phone */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Contact Phone</label>
              <input
                type='tel'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional phone for applicants'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
