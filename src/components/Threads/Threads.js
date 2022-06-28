import { Link, useParams } from 'react-router-dom';

import Content from '../UI/Content'
import Button from '../UI/Button'
import TopicCard from '../Home/TopicCard'

import classes from './Threads.module.css'

// to refine the last post string cutting formula

const Threads = props => {
    const params = useParams();

    const DUMMY_THREADS = [
        {
            topic_id: 1,
            thread_id: 1,
            course_id: 3,
            course_code: 'COR2100',
            thread_title: "Question",
            votes: 1,
            posts: 2,
            first_post: "Hi Prof,  I am confused on why the number of tesla cars produced worldwide is not macro? Thank you!",
            last_post: "hello! I think it is because the number of tesla cars produced worldwide is still an analysis of one particular market (the market for tesla cars)",
            last_user: "user.2021"
        },
        {
            topic_id: 1,
            thread_id: 2,
            course_id: 3,
            course_code: 'COR2100',
            thread_title: "Food for Thought",
            votes: 4,
            posts: 2,
            first_post: "Hello Prof, Should we have free public healthcare? Why and why not? Is it right to say that we should not have free public healthcare because it is a public good, thus it is non-excludable and non-rivalrous. As a result, this would lead to a free rider problem whereby everyone just want to consume one unit of the good and not pay for it. However, I need some help in explaining why public healthcare should not be free in economics terms. What's your example of the law of unintended consequences? Regarding this question, can I say that one unintended consequences of Singapore charging high tax rates on tabacco has led to Singaporeans sourcing for other substitutes such as vapes which led to high rates of illegal importation of E-cigarette and increasing negative externalities in our society?",
            last_post: "Healthcare is not a public good, it is neither non-rivalrous nor non-excludable.",
            last_user: "user.2021"
        },
        {
            topic_id: 1,
            thread_id: 3,
            course_id: 3,
            course_code: 'COR2100',
            thread_title: "Optimal decision",
            votes: 2,
            posts: 2,
            first_post: "Hello all! Sorry I just wanted to clarify , in the broadway example does the lowest benefit from watching the show means the optimal decision?",
            last_post: "the question asks how much benefit he at least needs to get such that when he is choosing between going or not going (i.e., when he is doing benefit-cost analysis of going or not), he decides to go.",
            last_user: "user.2021"
        },
        {
            topic_id: 4,
            thread_id: 1,
            course_id: 5,
            course_code: 'COR2100',
            thread_title: "Free Reflection",
            votes: 0,
            posts: 2,
            first_post: "Write a short reflection in response to the lecture (e.g., on what you have learned or found interesting about it).",
            last_post: "Hello Long Ji! I definitely agree with your point that it is honourable for an individual to fight for their rights and it brings about success in some cases. However, I would like to add my opinion by putting myself in the refugees' shoes.",
            last_user: "user.2021"
        }
    ]

    const filteredThreads = DUMMY_THREADS.filter(thread => {
        return thread.course_code === params.courseCode && thread.topic_id == params.topicId;
    })

    return (
        <Content pageTitle='Threads'>
            <Link to={`/${params.courseCode}`} className={classes.back}>Back to Topics</Link>
            <Button className={classes.right_align}>+ NEW THREAD</Button>
            <br />
            {filteredThreads.length === 0 ? (<p>No threads created yet.</p>) : 
                (filteredThreads.map((eachcard) => (
                    <TopicCard 
                        key={eachcard.thread_id}
                        card_id={eachcard.thread_id}
                        title={eachcard.thread_title}
                        description={eachcard.first_post}
                        threads={eachcard.votes}
                        posts={eachcard.posts}
                        last_post={eachcard.last_post}
                        last_user={eachcard.last_user}
                    />
            )))}
        </Content>
    )
}

export default Threads;