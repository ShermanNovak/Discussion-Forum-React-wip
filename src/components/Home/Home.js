import TopicCard from './TopicCard'
import Content from '../UI/Content'

import classes from './Home.module.css'

const Home = props => {

    const DUMMY_TOPICS = [
        {
            course_id: 3,
            course: "COR2100",
            topic_id: 1,
            topic_title: "Week 1",
            topic_description: "Basic Concepts",
            threads: 8, 
            posts: 15,
            last_post: "Looks correct.",
            last_user: "user.2021"
        },
        {
            course_id: 3,
            course: "COR2100",
            topic_id: 2,
            topic_title: "Week 2",
            topic_description: "Consumer Choice & Demand",
            threads: 8, 
            posts: 15,
            last_post: "Very nice.",
            last_user: "user.2021"
        },
        {
            course_id: 3,
            course: "COR2100",
            topic_id: 3,
            topic_title: "Week 3",
            topic_description: "Supply & Firm Production & Costs",
            threads: 8, 
            posts: 15,
            last_post: "hello! i think in this case it would be similar to the example we did in class on the opportunity cost in policy design? there were 4 alternatives in the case of PLQ mall. to rank the decisions, i think we have to depend on the context of the question? like for instance in the case we discussed in class, it was the opportunity cost of the one of the alternatives - the affordable housing project. ",
            last_user: "user.2021"
        },
        {
            course_id: 5,
            course: "COR3001",
            topic_id: 4,
            topic_title: "Week 4 Guest Lecture",
            topic_description: "Write a short reflection (no more than 250 words) in response to ONE of the pinned prompts. If you wish, your reflection may elaborate upon the insight or question you submitted (or soon will be submitting) for this week's Reading Responses.",
            threads: 4, 
            posts: 44,
            last_post: "Hello Long Ji! I definitely agree with your point that it is honourable for an individual to fight for their rights and it brings about success in some cases. However, I would like to add my opinion by putting myself in the refugees' shoes.",
            last_user: "user.2021"
        }
    ] 

    const filteredTopics = DUMMY_TOPICS.filter(topic => {
        return topic.course_id === props.selectedTab;
    })

    return (
        <Content pageTitle='Topics'>
            {filteredTopics.length === 0 ? (<p>No topics created yet.</p>) : 
                (filteredTopics.map((eachcard) => (
                    <TopicCard
                        key={eachcard.topic_id}
                        card_id={eachcard.topic_id}
                        title={eachcard.topic_title}
                        description={eachcard.topic_description}
                        threads={eachcard.threads}
                        posts={eachcard.posts}
                        last_post={eachcard.last_post}
                        last_user={eachcard.last_user}
                        onClick={props.changeSelectedTopicHandler}
                    />
                )))
            }
        </Content>
    )
}

export default Home;