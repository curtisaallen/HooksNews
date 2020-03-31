import React from "react";
import { Link } from "@reach/router";
import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from '../../firebase/';
import { navigate } from "@reach/router"

function LinkItem({ link, index, showCount}) {
  const { firebase, user } = React.useContext(FirebaseContext)
  function handleVote() {
      if(!user) {
        navigate('/login') 
      } else {
       const voteRef = firebase.db.collection('links').doc(link.id);
       console.log(voteRef, ' voteRef')
       voteRef.get().then(doc => {
         if(doc.exists) {
            const previousVotes = doc.data().votes;
            const vote = { votedBy: { id: user.uid, name: user.displayName }};
            console.log(vote, ' vote')
            const updatedVotes = [...previousVotes, vote];
            const voteCount = updatedVotes.length;
            console.log(voteCount, ' voteCount')
            voteRef.update({ votes: updatedVotes, voteCount })
         }
       })
      }
  }
  function handleDeleteLink() {
       const linkRef = firebase.db.collection('links').doc(link.id);
       linkRef.delete().then(() => {
         console.log(`Doc with ID ${link.id} deleted`);
       }).catch(err => {
         console.error("Error deleting document:", err);
       });
  }
  const postedByAuthUser = user && user.uid === link.postedBy.id;
  //console.log(link, ' link votes')
  return (
        <div className="flex items-start mt2">
          <div className="flex items-center">
            {showCount && <span className="gray">{index}</span>}
            <div className="vote-button" onClick={handleVote}>▲</div>
          </div>
          <div className="ml1">
              <div>
                <a href={link.url} className="black no-underline">
                  {link.description}
                </a>
                <span className="link">({getDomain(link.url)})</span>
              </div>
              <div className="f6 1h-copy">
                {link.voteCount} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
                {" | "}
                <Link to={`/link/${link.id}`}>
                  {link.comments.length > 0 ? `${link.comments.length} comments` : "discuss"}
                </Link>
                {postedByAuthUser && (
                  <>
                    {" | "}
                    <span className="delete-button" onClick={handleDeleteLink}>
                       Delete
                    </span>
                  </>
                )}
              </div>
          </div>
        </div>
      );
}

export default LinkItem;
