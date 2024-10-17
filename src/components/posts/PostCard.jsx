import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Post = () => {
   // ---------------------------------------------------------crerating update part----------------------------------------------------
  const [editingPostId, setEditingPostId] = useState(null); // Track which post is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleEditClick = (post) => {
    setEditingPostId(post._id); // Set the post being edited
    setEditTitle(post.title); // Set initial value for title
    setEditContent(post.content); // Set initial value for content
  };



  // const handleUpdate = async (postId) => {
  //   try {
  //     const response = await axios.put(`http://localhost:5500/api/v2/updateTask${postId}`);
  //     setEditingPostId(postId);
  //     toast.success("Post updated successfully");
  //     console.log(response.data)



      

  //     console.log(`Updating post ${postId} with title: ${editTitle} and content: ${editContent}`);

  //   } catch (error) {
  //     console.log('error on update post', error)
  //     toast.error('error on update post')
  //   }
    

  //   // After successful update, reset editing state
  //   setEditingPostId(null);
  // };


  const handleUpdate = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:5500/api/v2/updateTask/${postId}`, {
        title: editTitle,  // Send updated title
        content: editContent,  // Send updated content
      });
      
      // Reset editing state
      setEditingPostId(null);
  
      // Optionally, you can update the posts state here to reflect the changes in the UI
      setPosts(posts.map(post => post._id === postId ? { ...post, title: editTitle, content: editContent } : post));
  
      toast.success("Post updated successfully");
      console.log(response.data);
    } catch (error) {
      console.log('Error updating post', error);
      toast.error('Error updating post');
    }
  };
  

// -------------------------------------------------------------------------------------------------------------------------------------------------
  const [posts, setPosts] = useState([]);
  const [, setDeletemsg] = useState(false);
  const [, setDeleteid] = useState(null);
  const userId = sessionStorage.getItem("id"); 

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) {
        toast.error("User not logged in!");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v2/getTasks/${userId}`
        );
        setPosts(response.data.post);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching posts", error);
        toast.error("Failed to fetch posts");
      }
    };
    fetchUserPosts();
  }, [userId]);

  const DeletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v2/deleteTask/${id}`
      );
      setPosts(posts.filter((post) => post._id !== id));
      setDeletemsg(true);
      setDeleteid(id);
      toast.success("Post deleted");
      console.log(response.data);
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
  //     <h1 className="text-center text-4xl font-semibold mb-8">
  //       View All Posts: {posts && posts.length}
  //     </h1>
  //     {/* Conditional rendering for no posts */}
  //     {posts && posts.length > 0 ? (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
  //         {posts.map((post, index) => (
  //           <div
  //             key={index}
  //             className="bg-white shadow-lg shadow-black rounded-lg p-6 flex flex-col space-y-4"
  //           >
  //             <div>
  //               <h2 className="text-xl font-bold text-gray-800">
  //                 {post.title}
  //               </h2>
  //               <p className="text-gray-600">{post.content}</p>
  //             </div>
  //             <div className="flex justify-around items-center">
  //               <button
  //                 onClick={() => {
  //                   DeletePost(post._id);
  //                 }}
  //                 className="px-2 py-1 rounded-md outline-slate-400 bg-red-600 text-white"
  //               >
  //                 Delete
  //               </button>
  //               <button className="px-2 py-1 rounded-md outline-slate-400 bg-blue-600 text-white">
  //                 update
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <h2 className="text-center text-xl mt-4">No posts available</h2>
  //     )}
  //     <ToastContainer /> {/* Include ToastContainer to show notifications */}
  //   </div>
  // );


  // ---------------------------------------create new return for update part-----------------------
  return (
    <div>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg shadow-black rounded-lg p-6 flex flex-col space-y-4">
              <div>
                {editingPostId === post._id ? (
                  // Show input fields if editing
                  <>
                    <input 
                      type="text" 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)} 
                      className="border p-2 rounded-md w-full mb-2"
                    />
                    <textarea 
                      value={editContent} 
                      onChange={(e) => setEditContent(e.target.value)} 
                      className="border p-2 rounded-md w-full mb-2"
                    />
                  </>
                ) : (
                  // Show title and content if not editing
                  <>
                    <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                    <p className="text-gray-600">{post.content}</p>
                  </>
                )}
              </div>
              <div className='flex justify-around items-center'>
                <button 
                  onClick={() => DeletePost(post._id)} 
                  className='px-2 py-1 rounded-md outline-slate-400 bg-red-600 text-white'
                >
                  Delete
                </button>
                {editingPostId === post._id ? (
                  <button 
                    onClick={() => handleUpdate(post._id)} 
                    className='px-2 py-1 rounded-md outline-slate-400 bg-green-600 text-white'
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEditClick(post)} 
                    className='px-2 py-1 rounded-md outline-slate-400 bg-blue-600 text-white'
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Post;
