import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import SideBar from "../Navigation/SideBar";
import Post from "./Post";

import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase.js";

import dp2 from "../../assets/dp2.png";
import useInput from "../../hooks/use-input";
import classes from "./Thread.module.css";

const Thread = (props) => {
  const params = useParams();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: enteredPost,
    isValid: enteredPostIsValid,
    hasError: postInputHasError,
    valueChangeHandler: postChangeHandler,
    inputBlurHandler: postBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().length > 0);

  useEffect(() => {
    console.log("useEffect");
    const fetchPosts = async () => {
      setIsLoading(true);

      let loadedPosts = [];

      const q = query(
        collection(db, "posts"),
        where("course_code", "==", params.courseCode),
        where("category_id", "==", Number(params.categoryID)),
        where("thread_id", "==", Number(params.threadID))
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        loadedPosts.push(doc.data());
      });

      setPosts(loadedPosts);
      console.log(posts);
      setIsLoading(false);
    };

    fetchPosts().catch((error) => {
      setIsLoading(false);
    });
  }, [params.courseCode, params.categoryID, params.threadID]);

  return (
    <SideBar>
      <h1>{posts[0].post_content}</h1>
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {posts.length === 0 ? (
        <p>No posts created yet.</p>
      ) : (
        posts.slice(1).map((post) => <Post data={post} />)
      )}
      {posts.length > 0 && (
        <div className="row">
          <div className="col-1">
            <img
              src={dp2}
              width="50"
              height="50"
              className="rounded-circle"
              alt="profile"
            />
          </div>
          <div className="col-11">
            <div className="form-floating">
              <textarea
                className={`form-control ${
                  postInputHasError ? "is-invalid" : ""
                }`}
                placeholder="Type your reply here..."
                id="floatingTextarea2"
                onChange={postChangeHandler}
                onBlur={postBlurHandler}
                value={enteredPost}
                style={{ height: "100px" }}
              ></textarea>
              <label for="floatingTextarea2">Type your reply here...</label>
            </div>
            <button className="btn mt-3">Post Comment</button>
          </div>
        </div>
      )}
    </SideBar>
  );
};

export default Thread;
