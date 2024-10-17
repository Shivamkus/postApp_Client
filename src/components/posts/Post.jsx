import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../App.css";
const Post = () => {

  // Track which post is being edited
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [, setDeletemsg] = useState(false);
  const [, setDeleteid] = useState(null);
  const userId = sessionStorage.getItem("id");


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const userId = sessionStorage.getItem("id");  // Get the current user ID
  //     if (userId) {
  //       const response = await axios.get(`http://localhost:5500/api/v1/posts?userId=${userId}`);
  //       setPosts(response.data.post);
  //     }
  //   };
  //   fetchPosts();
  // }, []);
  

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
        console.log(response.data.post);
      } catch (error) {
        console.log("Error fetching posts", error);
        // toast.error("Failed to fetch posts");
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

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5500/api/v2/updateTask/${id}`,
        {
          title: editTitle,
          content: editContent,
          userId: userId,
        }
      );

      setEditingPostId(null);
      setPosts(
        posts.map((post) =>
          post._id === id
            ? { ...post, title: editTitle, content: editContent }
            : post
        )
      );

      toast.success("Post updated successfully");
      console.log(response.data);
    } catch (error) {
      console.log("Error updating post", error);
      toast.error("Error updating post");
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg shadow-black rounded-lg p-6 flex flex-col space-y-4 justify-between"
            >
              <div>
                {editingPostId === post._id ? (
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
                  <>
                    <h2 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 scrollbar-thin overflow-y-auto max-h-24">
                      {post.content}
                    </p>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => DeletePost(post._id)}
                  className="px-2 py-1 rounded-md outline-slate-400 bg-red-600 text-white"
                >
                  Delete
                </button>
                {editingPostId === post._id ? (
                  <button
                    onClick={() => handleUpdate(post._id)}
                    className="px-2 py-1 rounded-md outline-slate-400 bg-green-600 text-white"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(post)}
                    className="px-2 py-1 rounded-md outline-slate-400 bg-blue-600 text-white"
                  >
                    Update
                  </button>
                )}
                <p className="text-sm flex justify-end items-end">
                  Date: {new Date(post.createdAt).toLocaleDateString("en-GB")}{" "}
                  <br />
                  Time:{" "}
                  {new Date(post.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
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
