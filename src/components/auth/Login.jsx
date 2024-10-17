import axios from 'axios';
import '../../App.css';
import { useState } from 'react';
import {  ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/index';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Inputs, SetInputs] = useState({
    email:"",
    password:"",
  });
  const change =(e)=>{
  const {name, value}= e.target;
  SetInputs({...Inputs, [name]:value});
  }

  // const Submit = async(e)=>{
  //   e.preventDefault();
  //   try {
    
  //     await axios.post('http://localhost:5500/api/v1/signin',Inputs).then((response)=>{
  //       toast.success(response.data.message)
  //       sessionStorage.setItem("id", response.data.user._id);
  //       dispatch(authActions.login());
  //       navigate('/post')
  //     })
      
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }


  // const Submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5500/api/v1/signin', Inputs);
  //     toast.success(response.data.message); // Show success message
  //     sessionStorage.setItem("id", response.data.user._id);
  //     localStorage.setItem("isLoggedIn", "true"); // Set login state in local storage
  //     dispatch(authActions.login());
  //     navigate('/post');
  //   } catch (error) {
  //     // Handle errors
  //     if (error.response) {
  //       // Server responded with a status other than 200 range
  //       toast.error(error.response.data.message || "An error occurred");
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       toast.error("Network error, please try again later.");
  //     } else {
  //       // Something happened in setting up the request
  //       toast.error("An error occurred: " + error.message);
  //     }
  //   }
  // };
  

  //-------------------------------------------------------------------------------------------------------------------
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/api/v1/signin', Inputs);
      toast.success(response.data.message);
      sessionStorage.setItem("id", response.data.user._id);  // Store the new user ID
      localStorage.setItem("isLoggedIn", "true");  // Store login state
      dispatch(authActions.login());
      navigate('/post');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
//-------------------------------------------------------------------------------------------------------------------

  return (
    <div className='w-full h-screen bg-slate-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md shadow-2xl shadow-black border-e-slate-100 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]'>
        <h1 className='text-3xl font-bold text-center mb-6'>Login</h1>

        {/* Email Field */}
        <div className='relative w-full mb-6'>
          <input
          name='email'
            type="email"
            placeholder=" "
            value={Inputs.email}
            onChange={change}
            className="w-full p-3 rounded-lg border border-black outline-none focus:ring-2 focus:border-transparent"
            required
          />
          <label className={`absolute left-3 top-[-10px] text-sm text-blue-600 transition-all duration-200 ease-out 
            ${Inputs.email ? 'text-sm' : 'text-gray-500'} bg-white px-1`}>
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className='relative w-full mb-6'>
          <input
            type="password"
            name='password'
            placeholder=" "
            value={Inputs.password}
            onChange={change}
            className="w-full p-3 rounded-lg border border-black outline-none focus:ring-blue-500 focus:border-transparent"
            required
          />
          <label className={`absolute left-3 top-[-10px] text-sm text-blue-600 transition-all duration-200 ease-out 
            ${Inputs.password ? 'text-sm' : 'text-gray-500'} bg-white px-1`}>
            Password
          </label>
        </div>

        {/* Submit Button */}
        <div className='flex flex-col justify-center items-center w-full mt-5'>
          <button
          onClick={Submit}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </div>

      </div>
      <ToastContainer />

    </div>
  );
}

export default Login;
