import '../../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/api/v1/register', inputs);
      if (response.data.message === 'Email already exists') {
        toast.error('Email already exists');
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        navigate('/login');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg); // Display error message from server or fallback to error.message
      console.log(errorMsg);
    }
  };

  return (
    <div className='w-full h-screen bg-slate-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md shadow-2xl shadow-black border-e-slate-100 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Signup</h1>

        {/* Username Field */}
        <div className='relative w-full mb-6'>
          <label className='absolute left-3 top-[-10px] text-sm text-blue-600 bg-white px-1'>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            className="w-[100%] p-3 rounded-lg border border-black outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div className='relative w-full mb-6'>
          <label className='absolute left-3 top-[-10px] text-sm text-blue-600 bg-white px-1'>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="w-[100%] p-3 rounded-lg border border-black outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* Password Field */}
        <div className='relative w-full mb-6'>
          <label className='absolute left-3 top-[-10px] text-sm text-blue-600 bg-white px-1'>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className="w-[100%] p-3 rounded-lg border border-black outline-none focus:ring-2 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className='flex flex-col justify-center items-center w-full mt-5'>
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
