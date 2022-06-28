import dp1 from '../../assets/dp1.png'
import Card from '../UI/Card'

import classes from './TopicCard.module.css'

const TopicCard = props => {
  const LAST_POST_LENGTH = Math.max(30, props.description.length - 50);

  return (
    <Card 
      onClick={props.onClick}
      className={classes.topic_card}
      >
        <div className={classes.vertical_line}>
          <span className={classes.threads}>Threads</span> 
          <span className={classes.posts}>Posts</span>
          <span className={classes.last_post}>Last Post</span>
          <br />
          <span className={classes.thread_count}>{props.threads}</span>
          <span className={classes.post_count}>{props.posts}</span>
          <img className={classes.last_user} src={dp1} alt="dp1"></img>
          <span className={classes.last_post_text}>{props.last_post.substring(0, LAST_POST_LENGTH)}{props.last_post.length >= LAST_POST_LENGTH && '...'}</span>
        </div>
        <b className={classes.title}>{props.title}</b>
        <p className={classes.description}>{props.description}</p>
    </Card>
  )
}

export default TopicCard;