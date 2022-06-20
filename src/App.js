import Header from './components/Navigation/Header'
import Home from './components/Home/Home'
import Threads from './components/Threads/Threads'

import { useState } from 'react';

function App() {

  const [currentPage, setCurrentPage] = useState('Topics');

  const [selectedTab, setSelectedTab] = useState('IS112');

  const [selectedTopic, setSelectedTopic] = useState('');

  const changeSelectedTopicHandler = (event) => {
      setSelectedTopic(event.target.dataset.cid);
      setCurrentPage('Threads');
  }

  const changeSelectedTabHandler = (event) => {
      setCurrentPage('Topics');
      setSelectedTab(event.target.dataset.courseid);
  }

  const backToTopicsHandler = (event) => {
    setCurrentPage('Topics');
  }

  return (
    <div>
      <Header 
        pageheader="Discussion Forum"
        selectedTab={selectedTab}
        changeSelectedTabHandler={changeSelectedTabHandler}
      />
      
      {currentPage === 'Topics' ? 
        <Home 
          selectedTab={selectedTab}
          changeSelectedTabHandler={changeSelectedTabHandler}
          changeSelectedTopicHandler={changeSelectedTopicHandler}
        /> : ''}

      {currentPage === 'Threads' ?
        <Threads 
          selectedTab={selectedTab}
          selectedTopic={selectedTopic}
          backToTopicsHandler={backToTopicsHandler}
        /> : ''}
      
    </div>
  );
}

export default App;
