import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const AllPost = () => {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/v2/AllPosts"
        );
        setAllPost(response.data.posts);
        console.log(response.data.post);
      } catch (error) {
        console.log("Error fetching posts", error);
        // toast.error("Failed to fetch posts");
      }
    };
    getAllPosts();
  }, []);

  return (
    <div className="flex justify-center items-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {allPost.map((post) => (
            <div
              key={post._id} // Always add a unique key when rendering a list
              className="bg-white shadow-lg shadow-black rounded-lg p-6 flex flex-col space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 scrollbar-thin overflow-y-auto max-h-24">
                {post.content}
              </p>
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
          ))}
        </div>
      
      <ToastContainer />
    </div>
  )};

export default AllPost;
