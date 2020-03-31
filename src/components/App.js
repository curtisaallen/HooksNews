import React from "react";
import { Router } from "@reach/router"
import CreateLink from './Link/CreateLink';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import SearchLink from './Link/SearchLinks';
import Top from './Link/LinkList';
import News from './Link/LinkList';
import LinkDetail from './Link/LinkDetail';
import Home from './Link/LinkList';
import TestList from './Link/TestList';
import Header from './Header';
import useAuth from "../../src/components/Auth/useAuth";
import firebase, { FirebaseContext } from '../firebase';

function App() {
  const user = useAuth();
  return (
    <div className="app-container">
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Header />
      <div className="route-container">
      
        <Router>
            <Home default path="/new/:num" />
            <TestList path="/test" />
            <CreateLink path="/create" />
            <Login path="/login" />
            <ForgotPassword path="/forgot" />
            <SearchLink path="/search"  />
            <Top path="/top" />
            <News path="/new/:page" />
            <LinkDetail path="/link/:linkId" />
        </Router>
      
      </div>
</FirebaseContext.Provider>
    </div>
  );
}

export default App;
