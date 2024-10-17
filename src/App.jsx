import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Post from "./components/posts/post";
import PostForm from "./components/posts/PostForm";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import AllPost from "./components/posts/AllPost";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addPost" element={<PostForm />} />
          <Route path="/post" element={<Post />} />
          <Route path="/allPost" element={<AllPost />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
