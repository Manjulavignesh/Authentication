import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';


function App() {
  const authCtx=useContext(AuthContext);
    
  
  return (
     <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
         <Route path='/profile'>
         {authCtx.isLoggedIn  && <UserProfile />}
         {!authCtx.isLoggedIn && <AuthPage/>} 
        </Route>
        <Route path="*">
           <Redirect to="/auth"/>
        </Route>
      </Switch>
    </Layout>
   
    
  );
}

export default App;
