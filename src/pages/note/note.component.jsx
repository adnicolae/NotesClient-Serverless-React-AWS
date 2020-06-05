import React, { useEffect, useState, useRef } from 'react';
import { API, Storage } from 'aws-amplify';
import onError from '../../helpers/onError';
import { useParams, useHistory } from 'react-router-dom';
import NoteFormGroup from '../../components/note-form-group/note-form-group.component';
import config from '../../config/config';
import s3Upload from '../../helpers/s3Upload';

const NotePage = () => {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [ note, setNote ] = useState(null);
  const [ content, setContent ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);

  useEffect(() => {
    const loadNote = async id => {
      try {
        const note = await API.get('notes', `/notes/${ id }`)
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }
    loadNote(id);
  }, [id]);

  const handleFileChange = e => file.current = e.target.files[0];
  
  const updateNote = note => API.put("notes", `/notes/${ id }`, {
    body: note
  });

  const deleteNote = note => API.del("notes", `/notes/${ id }`);

  const handleSubmit = async e => {
    let attachment;

    e.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Your file is too large. Please upload a file smaller than ${ config.MAX_ATTACHMENT_SIZE / 1000000 } MB`);
      return;
    }
    
    setIsLoading(true);

    try {
      if (file.current){
        attachment = await s3Upload(file.current);
      }

      await updateNote({
        content,
        attachment: attachment || note.attachment
      });
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  const handleDelete = async e => {
    e.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push('/');
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  const updateContent = e => setContent(e.target.value);

  return (
      <div className="notes">
        <NoteFormGroup 
          content={ content }
          updateContent={ updateContent }
          handleSubmit={ handleSubmit }
          handleFileChange={ handleFileChange }
          isLoading={ isLoading }
          isDeleting={ isDeleting }
          handleDelete={ handleDelete }
          note={ note }
        />
    </div>
  )
}

export default NotePage;
