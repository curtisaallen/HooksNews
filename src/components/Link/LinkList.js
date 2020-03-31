import React from "react";
import { FirebaseContext } from '../../firebase/';
import LinkItem from '../Link/LinkItem';
import { LINKS_PER_PAGE } from '../../utils/index';
import { navigate } from "@reach/router"

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const isNewPage = props.location.pathname.includes("new");

  React.useEffect(() => {
    getLinks();
  }, [])

  function getLinks() {
    firebase.db.collection('links').orderBy('created', 'desc').onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, voted: doc.data().votes, ...doc.data() }
    })
    const lastLink = links[links.length - 1]
    setLinks(links)    
  }

  function renderLinks() {
    if(isNewPage) {
        return links
    }
    const topLinks = links.slice().sort((a, b) => b.votes.length = a.votes.length)
    return topLinks;
  }
  return (
    <div>
      
      {renderLinks().map((link, index) => (
        <LinkItem  key={link.id} showCount={true} link={link} index={index} />
      ))} 

   </div>
  );
}

export default LinkList;
