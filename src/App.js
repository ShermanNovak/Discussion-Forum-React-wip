import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment, useContext } from 'react';

import Header from './components/Navigation/Header'
import Topics from './components/Home/Topics'
import Threads from './components/Threads/Threads'
import AuthForm from './components/Login/AuthForm'
import AuthContext from './store/auth-context'
import Thread from './components/Threads/Thread'

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      {isLoggedIn && <Header pageheader="Discussion Forum" />}     
      
      <Routes>
        <Route path='/auth' element={
          <AuthForm />
        }/> 
        {isLoggedIn && 
          <Route path='/:courseCode/:topicId/:threadId' element={
            <Thread />
          }/>
        }
        {isLoggedIn && 
          <Route path='/:courseCode/:topicId' element={
            <Threads />
          }/>
        }
        {isLoggedIn && 
          <Route path='/:courseCode' element={
            <Topics />
          }/>
        }
        {!isLoggedIn && 
          <Route path='*' element={
            <Navigate to='/auth' />
          }/>
        }
        {isLoggedIn && 
          <Route path='*' element={
            <Navigate to='/IS112' />
          }/>
        }
      </Routes>
    </Fragment>
  );
}

export default App;
