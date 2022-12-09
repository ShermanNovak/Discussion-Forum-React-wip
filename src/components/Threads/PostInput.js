import dp2 from '../../assets/dp2.png';
import Button from '../UI/Button';

import classes from './PostInput.module.css';

const PostInput = props => {
    return (
        <div className={classes.post_input}>
            <img className={classes.pfp} src={dp2} alt='user profile' />
            <textarea className={classes.textarea_input} placeholder='Type here to post something...'/>
            <br></br>
            <Button className={classes.post_comment}>Post comment</Button>
        </div>
    );
};

export default PostInput;