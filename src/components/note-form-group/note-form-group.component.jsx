import React from 'react'
import { Form } from 'react-bootstrap'
import LoaderButton from '../../components/loader-button/loader-button.component'
import './note-form-group.styles.scss';

const NoteFormGroup = (props) => {
  const {
    content,
    updateContent,
    handleSubmit, 
    handleFileChange, 
    handleDelete=undefined, 
    isLoading=false, 
    isDeleting=false,
    note
  } = props;

  const formatFileName = fileName => fileName.replace(/^\w+-/, "");

  return (
    <div>
      <Form onSubmit={ handleSubmit }>
        <Form.Group controlId='content'>
          <Form.Control 
            value={ content }
            as="textarea"
            onChange={ updateContent }
          />
        </Form.Group>
        <Form.Label>Attachment</Form.Label>
        { note && note.attachment && (
          <Form.Group>
            <a className='attachment-link' target="_blank" rel="noopener noreferrer" href={ note.attachmentURL }>
              { formatFileName(note.attachment) }
            </a>
          </Form.Group>
        )}
        <Form.Group controlId='file'>
          <Form.Control 
            type="file"
            onChange={ handleFileChange }
          />
        </Form.Group>
        <LoaderButton
          type="submit"
          variant="primary"
          isLoading={ isLoading }
          block
        >
          { note ? 'Save' : 'Create' }
        </LoaderButton>
        {handleDelete && (
          <LoaderButton
            type="submit"
            variant="danger"
            isLoading={ isDeleting }
            onClick={ handleDelete }
            block
          >
            Delete
          </LoaderButton>
        )}
      </Form>
    </div>
  )
}

export default NoteFormGroup;
