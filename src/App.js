import { Routes, Route, Navigate } from 'react-router-dom'
import { Fragment, useContext } from 'react';

import Topics from './components/Home/Topics'
import AuthForm from './components/Login/AuthForm'
import AuthContext from './store/auth-context'
import CreateForm from './components/Threads/CreateForm';
import Thread from './components/Threads/Thread'

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <Routes>
        <Route path='/auth' element={
          <AuthForm />
        }/> 
        {isLoggedIn && 
          <Route path='/:courseCode/:categoryID/:threadID' element={
            <Thread />
          }/>
        }
        {isLoggedIn && 
          <Route path='/:courseCode/:categoryID/create' element={
            <CreateForm />
          }/>
        }
        {isLoggedIn && 
          <Route path='/:courseCode/:categoryID' element={
            <Topics />
          }/>
        }
        {!isLoggedIn && 
          <Route path='*' element={
            <Navigate to='/auth' />
          }/>
        }
      </Routes>
    </Fragment>
  );
}

export default App;
