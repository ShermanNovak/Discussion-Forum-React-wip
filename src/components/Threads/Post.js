import dp1 from '../../assets/dp1.png';

import classes from './Post.module.css';

const Post = props => {
    return (
        <div className={classes.post}>
            <img className={classes.pfp} src={dp1} alt='user profile' />
            <span className={classes.username}>Pawel Kadysz</span>
            <br />
            <div className={classes.post_content}>{props.post_content}</div>
        </div>
    );
};

export default Post;