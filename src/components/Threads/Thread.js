import { useParams } from 'react-router-dom';

import BackLink from '../UI/BackLink';
import Content from '../UI/Content';
import Post from './Post';
import PostInput from './PostInput';

import classes from './Thread.module.css';

const Thread = props => {
    const params = useParams();

    const DUMMY_THREAD_TITLE = "Question";

    const DUMMY_POSTS = [
        {
            course_code: 'COR2100',
            topic_id: 1,
            thread_id: 1,
            post_id: 1,
            post_content: "Hi Prof,  I am confused on why the number of tesla cars produced worldwide is not macro? Thank you!"
        },
        {
            course_code: 'COR2100',
            topic_id: 1,
            thread_id: 1,
            post_id: 2,
            post_content: "hello! I think it is because the number of tesla cars produced worldwide is still an analysis of one particular market (the market for tesla cars)"
        }
    ]

    const filteredPosts = DUMMY_POSTS.filter(post => {
        return post.course_code === params.courseCode && post.topic_id == params.topicId && post.thread_id == params.threadId;
    })

    return (
        <Content pageTitle={DUMMY_THREAD_TITLE}>
            <BackLink to={`/${params.courseCode}/${params.topicId}`}>Back to Threads</BackLink>
            {filteredPosts.length === 0 ? (<p>No posts created yet.</p>) : 
                (filteredPosts.map((eachpost) => (
                    <Post 
                        post_content={eachpost.post_content}
                    />
            )))}
            <PostInput />
        </Content>
    );
};

export default Thread;