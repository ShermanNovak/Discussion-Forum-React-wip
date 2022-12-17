import { useParams, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";

import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase/firebase.js";

import SideBar from "../Navigation/SideBar";
import dp2 from "../../assets/dp2.png";

const CreateForm = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    value: enteredPost,
    isValid: enteredPostIsValid,
    hasError: postInputHasError,
    valueChangeHandler: postChangeHandler,
    inputBlurHandler: postBlurHandler,
    reset: resetPostInput,
  } = useInput((value) => value.trim().length > 0);

  const createThreadHandler = async () => {

    let newThreadID = Math.floor(Math.random() * 10000000)
    let newPostID = Math.floor(Math.random() * 10000000)

    const docRef1 = await addDoc(collection(db, "posts"), {
      post_content: enteredPost,
      likes: 0,
      replies: 0,
      course_code: params.courseCode,
      category_id: Number(params.categoryID),
      thread_id: newThreadID,
      date_posted: new Date(),
      post_id: newPostID,
      author: "Sharlene Tio",
    });

    console.log("Document written with ID: ", docRef1.id);

    const docRef2 = await addDoc(collection(db, "threads"), {
      first_post: enteredPost,
      latest_post: '',
      likes: 0,
      replies: 0,
      course_code: params.courseCode,
      category_id: Number(params.categoryID),
      thread_id: newThreadID,
      date_posted: new Date(),
      post_id: newPostID,
      author: "Sharlene Tio",
    });

    console.log("Document written with ID: ", docRef2.id);
  
    navigate(`/${params.courseCode}/${params.categoryID}/${newThreadID}`)
  }

  return (
    <SideBar>
      <h1>Create a New Thread</h1>
      <p>{params.courseCode}</p>
      <div className="row h-100">
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
            <div className="form-floating h-100">
              <textarea
                className={`form-control ${
                  postInputHasError ? "is-invalid" : ""
                }`}
                placeholder="Type your question here..."
                id="floatingTextarea2"
                onChange={postChangeHandler}
                onBlur={postBlurHandler}
                value={enteredPost}
                style={{ height: "100%" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Type your reply here...</label>
            </div>
            <button className="btn mt-3" onClick={createThreadHandler}>
              Create Thread
            </button>
          </div>
        </div>
    </SideBar>
  );
};

export default CreateForm;
