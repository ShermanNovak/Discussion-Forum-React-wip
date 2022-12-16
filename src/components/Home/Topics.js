import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase.js";

import TopicCard from "./TopicCard";
import SideBar from '../Navigation/SideBar.js'

// maybe make fetching into a hook?

const Topics = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const fetchTopics = async () => {
      setIsLoading(true);

      let loadedTopics = [];

      const q = query(
        collection(db, "threads"),
        where("course_code", "==", params.courseCode),
        where("category_id", "==", Number(params.categoryID))
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        loadedTopics.push(doc.data());
      });

      setTopics(loadedTopics);
      console.log(topics);
      setIsLoading(false);
    };

    fetchTopics().catch((error) => {
      setIsLoading(false);
    });
  }, [params.courseCode, params.categoryID]);

  return (
    <SideBar>
      <div className="d-flex flex-row">
        <h1>Topics</h1>
        <button className="btn ms-auto">Ask a Question</button>
      </div>
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {topics.length === 0 ? (
        <p>No topics created yet.</p>
      ) : (
        topics.map((eachcard) => (
          <TopicCard
            key={eachcard.post_id}
            data={eachcard}
            onClick={() =>
              navigate(`/${eachcard.course_code}/${eachcard.category_id}/${eachcard.thread_id}`)
            }
          />
        ))
      )}
    </SideBar>
  );
};

export default Topics;
