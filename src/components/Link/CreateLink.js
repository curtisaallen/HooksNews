import React from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';
import { FirebaseContext } from '../../firebase/';

import { navigate } from "@reach/router"

const INITIAL_STATE = {
  description: "",
  url: ""
}
function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const {handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink)

  function handleCreateLink() {
    //console.log(user, 'link created')
    if(!user) {
      navigate('/login') 
    } else {
       const { url, description} = values;
       const newLink = {
         url,
         description,
         postedBy: {
           id: user.uid,
           name: user.displayName
         },
         voteCount: 0,
         votes: [],
         comments: [],
         created: Date.now()
       }
       //console.log(newLink)
       firebase.db.collection('links').add(newLink);
       navigate('/')
    }
  }
  return (
        <form onSubmit={handleSubmit} className="flex flex-column mt3">
          <input
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="A description for your link"
          autoComplete="off"
          type="text"
          className={errors.description && 'error-input'}
           />
           {errors.description && (
             <p className="error-text">
               {errors.description}
             </p>
           )}
          <input
          onChange={handleChange}
          value={values.url}
          name="url"
          placeholder="A URL for your link"
          autoComplete="off"
          type="text"
          className={errors.url && 'error-input'}
           />
           {errors.url && (
             <p className="error-text">
               {errors.url}
             </p>
           )}
           <button className="button" type="submit">
               Submit
           </button>
        </form>
      );
}

export default CreateLink;
