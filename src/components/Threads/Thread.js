import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import SideBar from "../Navigation/SideBar";
import Post from "./Post";

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
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
    reset: resetPostInput,
  } = useInput((value) => value.trim().length > 0);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      loadedPosts.push(doc.data());
    });

    loadedPosts.sort(function (a, b) {
      return a["date_posted"] - b["date_posted"];
    });

    setPosts(loadedPosts);
    console.log("posts:", posts);
    setIsLoading(false);
  };

  const submitReplyHandler = async () => {
    // check if there is an error
    // need to update latest_post on thread
    setIsLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      post_content: enteredPost,
      likes: 0,
      replies: 0,
      course_code: params.courseCode,
      category_id: Number(params.categoryID),
      thread_id: Number(params.threadID),
      date_posted: new Date(),
      post_id: Math.floor(Math.random() * 10000000),
      author: "Sharlene Tio",
    });

    console.log("Document written with ID: ", docRef.id);

    resetPostInput();
    fetchPosts().catch((error) => {
      setIsLoading(false);
      console.log(error)
    });
  };

  useEffect(() => {
    console.log("useEffect");

    fetchPosts().catch((error) => {
      setIsLoading(false);
      console.log(error)
    });
  }, [params.courseCode, params.categoryID, params.threadID]);

  return (
    <SideBar>
      {posts.length > 0 && <h1>{posts[0]["post_content"]}</h1>}
      {posts.length > 0 && (
        <p>
          Asked by {posts[0]["author"]} on{" "}
          {formatDate(posts[0]["date_posted"].toDate())}
        </p>
      )}
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!isLoading && posts.length === 0 ? (
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
              <label htmlFor="floatingTextarea2">Type your reply here...</label>
            </div>
            <button className="btn mt-3" onClick={submitReplyHandler}>
              Post Comment
            </button>
          </div>
        </div>
      )}
    </SideBar>
  );
};

export default Thread;
