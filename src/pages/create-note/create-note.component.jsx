import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import LoaderButton from '../../components/loader-button/loader-button.component'
import NoteFormGroup from '../../components/note-form-group/note-form-group.component';
import { useHistory } from 'react-router-dom';
import config from '../../config/config';
import { API } from 'aws-amplify';

import './create-note.styles.scss';
import onError from '../../helpers/onError';
import s3Upload from '../../helpers/s3Upload';

const CreateNote = () => {
  const file = useRef(null);
  const history = useHistory();
  const [ content, setContent ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const handleFileChange = e => {
    file.current = e.target.files[0];
  }

  const updateContent = e => setContent(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Your file is too large. Please upload a file smaller than ${ config.MAX_ATTACHMENT_SIZE / 1000000 } MB`);
      return;
    }
    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ content, attachment });
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  const createNote = note => {
    return API.post("notes", "/notes", {
      body: note
    })
  };

  return (
    <div className='create-note'>
      <NoteFormGroup 
        content={ content }
        updateContent={ updateContent }
        handleSubmit={ handleSubmit }
        handleFileChange={ handleFileChange }
        isLoading={ isLoading }
        includeDelete={ false }
      />
    </div>
  )
}

export default CreateNote;
