import React from "react";
import { Link } from "@reach/router";
import { FirebaseContext } from '../firebase';
import firebaseConfig from "../firebase/config";

function Header() {
  const { user, firebase } = React.useContext(FirebaseContext)
    return (
       <div className="header">
         <div className="flex">
                <img  src="/logo.png" alt="Logo" className="logo" />
                <Link to="/" className="header-title">
                  Hooks News
                </Link>
                <Link to="/new" className="header-link">
                  new
                </Link>
                <div className="divider">|</div>
                <Link to="/top" className="header-link">
                  top
                </Link>
                <div className="divider">|</div>
                <Link to="/search" className="header-link">
                  search
                </Link>
                {user && (
                <>
                <div className="divider">|</div>
                <Link to="/create" className="header-link">
                  submit
                </Link>
                </> 
                )}

              </div>
              <div className="flex">
                {user ? (
                  <>
                  <div className="header-name">{user.displayName}</div>  
                  <div className="divider">|</div>  
                  <div className="header-button" onClick={() =>  firebase.logout()}>
                    logout
                  </div>
                  </>
                ) : (
                  <Link to="/login" className="header-link">
                  login
                  </Link>
                )}
              </div>
       </div>
  );
}

export default Header;
