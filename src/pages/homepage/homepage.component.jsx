import React, { useContext, useState, useEffect } from 'react'
import './homepage.styles.scss';
import CurrentUserContext from '../../contexts/current-user.context';
import { ListGroup, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import onError from '../../helpers/onError';
import { API } from 'aws-amplify';

const HomePage = () => {
  const [ notes, setNotes ] = useState([]);
  const { isAuthenticated } = useContext(CurrentUserContext);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated) return;

      try {
        const notes = await loadNotes();
        
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    load();
  }, [isAuthenticated]);

  const loadNotes = () => API.get("notes", "/notes");

  const Landing = () => (
    <div className='homepage'>
      <div className="landing">
        <h1>✒</h1>
        <p>Serverless note-taking app</p>
        <p>Please login to create and view notes</p>
      </div>
    </div>
  );
  
  const Notes = () => (
    <div className="notes">
      <h1>My notes</h1>
      <hr />
      <LinkContainer className='link' key="new" to='/notes/new'>
        <ListGroup.Item>
          <h4>
            <b>{"\uFF0B"}</b> Create a new note
          </h4>
        </ListGroup.Item>
      </LinkContainer>
      <ListGroup>
        {!isLoading && renderNotes(notes)}
      </ListGroup>
    </div>
  )

  const renderNotes = notes => {
    return notes.map(note => (
      <LinkContainer key={ note.noteId } to={ `/notes/${ note.noteId }` }>
        <Card>
          <Card.Body className='link'>
            <Card.Title>{ note.content.trim().split('\n')[0] }</Card.Title>
            <Card.Text>
              {`Created on: ${ new Date(note.createAt).toLocaleString() }`}
            </Card.Text>
          </Card.Body>
        </Card>
    </LinkContainer>
    ))
  };

  return (
    <>
      { isAuthenticated ? Notes() : Landing() }
    </>
  )
}

export default HomePage;
