import dp1 from "../../assets/dp1.png";

import classes from "./Post.module.css";

const Post = (props) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="row">
      <div className="col-1">
        <img
          src={dp1}
          alt="profile"
          width="50"
          height="50"
          className="rounded-circle"
        />
      </div>
      <div className="col-11">
        <p>
          {props.data.author}, {formatDate(props.data.date_posted.toDate())}
        </p>
        <p>{props.data.post_content}</p>
      </div>
    </div>
  );
};

export default Post;
