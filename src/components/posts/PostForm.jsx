// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {ToastContainer, toast} from "react-toastify"
// let id = sessionStorage.getItem("id")
// // let toUpdateArray = [];
// const PostForm = () => {
//   const [Inputs, setInputs] = useState({
//     title:"",
//     content:"",
//   });
//   // const [Array, setArray] = useState([]);

//   const show = () =>{
//     document.getElementById('textarea').style.display = 'block';
//   }

//   const change = (e)=>{
//     const {name, value} = e.target;
//     setInputs({...Inputs, [name]:value});
//   }


// const submit =  useEffect(()=>{
//    async()=>{
//     if(Inputs.title === "", Inputs.content === ""){
//       toast.error("Title and Content is not Empty")
//     }else{
//       if(id){
//         await axios.post(`http://localhost:5500/api/v2/addTask`, {
//           title: Inputs.title,
//           content: Inputs.content,
//           id: id,
//         }).then((response) => {
//           console.log(response);
//           setInputs({title:"", content:""});
//           toast.success("your Post is created successfully");
//         }).catch((error) => {
//           console.error("Error creating post:", error);  // Log the error
//           toast.error("Failed to create post");
//         });
        
//       }
      
//     }
//    }
//   },[Inputs.content, Inputs.title])

   
  


//   return (
//     <div className="h-auto w-screen p-6 bg-slate-700 flex justify-center items-center">
//       <div className="h-full w-full max-w-lg bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-center mb-4">Add Your Post</h1>
//         <div className="flex flex-col space-y-4">
//           <input
//             className="px-4 py-2 rounded-md border border-black outline-none focus:ring-2 focus:ring-blue-400"
//             type="text"
//             name="title"
//             value={Inputs.title}
//             onChange={change}
//             onClick={show}
//             placeholder="Enter the title of the Post"
//           />
//           <textarea
//             id='textarea'
//              className="px-4 py-2 rounded-md border border-black outline-none focus:ring-2 focus:ring-blue-400 hidden"
//             name="content"
//             placeholder="Enter the content of the Post"
//             rows="4"
            
//           value={Inputs.content}
//           onChange={change}
//           />
//           <button
//           onClick={submit}
//           className="p-2 bg-blue-400 text-white rounded-md w-full hover:bg-blue-500 transition duration-200">
//             Create Post
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default PostForm;



import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
let id = sessionStorage.getItem("id");

const PostForm = () => {
  const [Inputs, setInputs] = useState({
    title: "",
    content: "",
    id
  });

  const navigate = useNavigate();

  const show = () => {
    document.getElementById('textarea').style.display = 'block';
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    if (Inputs.title === "" || Inputs.content === "") {
      toast.error("Title and Content cannot be empty");
    } else {
      if (id) {
        try {
          const response = await axios.post(`http://localhost:5500/api/v2/addTask`, {
            title: Inputs.title,
            content: Inputs.content,
            id: id,
          });
          console.log(response.data);
          setInputs({ title: "", content: "", id});
          // toast.success("Your post was created successfully");
          alert('post added successfully')
          navigate('/addPost')
        } catch (error) {
          console.error("Error creating post:", error);  
          toast.error("Failed to create post");
        }
      }
    }
  };

  return (
    <div className="h-auto w-screen min-h-screen  bg-slate-200 flex justify-center items-center">
      <div className="h-full w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Add Your Post</h1>
        <form onSubmit={submit} className="flex flex-col space-y-4">
          <input
            className="px-4 py-2 rounded-md border border-black outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="title"
            value={Inputs.title}
            onChange={change}
            onClick={show}
            placeholder="Enter the title of the Post"
          />
          <textarea
            id='textarea'
            className="px-4 py-2 rounded-md border border-black outline-none focus:ring-2 focus:ring-blue-400 hidden"
            name="content"
            placeholder="Enter the content of the Post"
            rows="4"
            value={Inputs.content}
            onChange={change}
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white rounded-md w-full hover:bg-blue-500 transition duration-200">
            Create Post
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostForm;
