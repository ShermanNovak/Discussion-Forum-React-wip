import dp1 from "../../assets/dp1.png";
import classes from "./TopicCard.module.css";

const TopicCard = (props) => {
  // const LAST_POST_LENGTH = Math.max(30, props.description.length - 50);
  // {props.last_post.substring(0, LAST_POST_LENGTH)}
  // {props.last_post.length >= LAST_POST_LENGTH && "..."}

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div onClick={props.onClick} className="card p-3 mb-3">
      <div className="row">
        <div className="col-1">
          <img
            width="50"
            height="50"
            className="rounded-circle"
            src={dp1}
            alt="profile"
          />
        </div>
        <div className="col-11">
          <p>{props.data.author}, {formatDate(props.data.date_posted.toDate())}</p>
          <p className="fw-bold">{props.data.first_post}</p>
          <p>{props.data.latest_post}</p>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA2UlEQVRIie2TQQ6CMBBFX8HEcgdNvALgTk/gPfQKbryIN3FP4pK4dWngDuKGcaEiJNIaoK58SZNJZzJ/2t/CHwuqisbzFUr2IJOeLXNE1tzSQ1NAx1n/5hUXinQG4L33BmsOMH0FI2OZKhdcT0djTRAvEUna0l5b4oFvyQMiypQ2n0AkQUdWDRP2CXviyoPq2px7UPsHkVibfU9JkfrgzoNq8G4eWN5+nW4eWO69jisPhCL1oHEClQ8o8OGZSrkBsgFFBiYIt+hInqt0LeJIAECHO3R8difwa+4RjELYrNTsbQAAAABJRU5ErkJggg=="
            alt="replies"
            className="pe-2"
          />
          <span className="pe-4">{props.data.replies} replies</span>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABGUlEQVRIieWVvUoDQRRGz91o3IBPIKbxAcSdUnwFsQko2FjlhaxSR0hpqaX4gxbCBnwBkQQL+7iBuNcmcUdNMpkkA4IfLAzMnXPu3WIG/mTKZps1sw9ErtKSN7ySHCFyiXDM6kbG4PV2WvmKH9wcojS/zqluuY44RyzgSQ3l7FtTKulyBJWkhkqLnxOX5GFxwSQ49OitPy0mKO8cTIADPMLVwCWQqbuxeQGqLsgYbAfN6/TTi2gIuiM2OvxurMo54AC6iUgDil+0a+3uzQf9laotCJaQgm5ggTZDCj5AG+B7F80alXP67WcINYHkp6Pl8gUqbbL0OpzA6n4GgXQ88W9kcWucwH6ViqtC87qHpItGJ3D/7tnUf88nOGJGqxNTHJIAAAAASUVORK5CYII="
            alt="likes"
            className="pe-2"
          />
          <span className="pe-2">{props.data.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
