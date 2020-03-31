import React from "react";
import { FirebaseContext } from '../../firebase/';
import LinkItem from '../Link/LinkItem';
import { LINKS_PER_PAGE } from '../../utils/index';
import { navigate } from "@reach/router"

function TestList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [links, setLinks] = React.useState([])
  const [cursor, setCursor] = React.useState(null);
  const [lastVisible, setlastVisible] = React.useState(null)
  const isNewPage = props.location.pathname.includes("test")
  const isTopPage = props.location.pathname.includes("top");
  const page = Number(props.num)
  const queryRef = firebase.db.collection('links');


  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe()
  }, [isTopPage, page])

  function getLinks() {
    //console.log(props.location.pathname, ' location')
    const hasCursor = Boolean(cursor);
    return firebase.db.collection('links').orderBy('created').limit(LINKS_PER_PAGE).onSnapshot(handleSnapshot)
    
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      //console.log(doc.data().votes, '  doc data')
      return { id: doc.id, voted: doc.data().votes, ...doc.data() }
    })
    //console.log({ links }, ' what is this')
    const lastLink = links[links.length - 1]
    // console.log(lastLink, ' last link')
    setLinks(links)
    setCursor(lastLink)
  }

  function visitPreviousPage() {
   console.log(cursor['created'], ' cursor[created]')
   const query = queryRef.orderBy('created')
   .endBefore(1576873042108)
   .limit(2);
   
   
   //.orderByChild('created').endBefore(cursor['created']).limitToLast(LINKS_PER_PAGE);

   //console.log(query, ' query')

    query.onSnapshot(snapshot => {
        const links = snapshot.docs.map(doc => {
            console.log(doc.data(), ' doc')
          return { id: doc.id, voted: doc.data().votes, ...doc.data() }
        })
        setLinks(links)
    })

  }

  function visitNextPage() {
      // console.log(' cursor')
    // const query = firebase.db.collection('links').orderBy('created', 'desc').startAfter(cursor).limit(LINKS_PER_PAGE);
    const query = firebase.db.collection('links').orderBy('created').startAfter(cursor['created']).limit(LINKS_PER_PAGE);
    
    // console.log(query)
   query.onSnapshot(snapshot => {
       const links = snapshot.docs.map(doc => {
           // console.log(doc.data(), '  doc data')
          return { id: doc.id, voted: doc.data().votes, ...doc.data() }
         })
         setLinks(links)
   })



  }

  function renderLinks() {
    //console.log( links, ' renderLinks')
    if(isNewPage) {
        return links
    }
    const topLinks = links.slice().sort((a, b) => b.votes.length = a.votes.length)
    return topLinks;
  }
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;
   // {renderLinks().map((link, index) => (
  return (
    <div>
      
      {links.map((link, index) => (
        <LinkItem  key={link.id} showCount={true} link={link} index={index + pageIndex} />
      ))} 

      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          <div className="pointer" onClick={visitNextPage}>Next</div>
        </div>
      )} 
   </div>
  );
}

export default TestList;
