import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import LoaderButton from '../loader-button/loader-button.component';
import { useFormFields } from '../../helpers/customHooks';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './billing-form.styles.scss';

const BillingForm = ({ isLoading, onSubmit, ...props }) => {
  const [ fields, handleFieldChange ] = useFormFields({
    name: "",
    storage: ''
  });
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ setIsCardComplete ] = useState(false);

  isLoading = isProcessing || isLoading;

  const handleSubmit = async e => {
    e.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <Form onSubmit={ handleSubmit } className="billing-form" autoComplete="off">
      <Form.Group controlId="storage">
        <Form.Label>Storage Preference</Form.Label>
        <Form.Control 
          min="0"
          type="number"
          value={ fields.storage }
          onChange={ handleFieldChange }
          placeholder="Number of notes to store"
        />
      </Form.Group>
      <hr />
      <Form.Group controlId="name">
        <Form.Label>Cardholder's name</Form.Label>
        <Form.Control 
          type="text"
          value={ fields.name }
          onChange={ handleFieldChange }
          placeholder="Name on card"
        />
      </Form.Group>
      <Form.Label>Credit Card Information</Form.Label>
      <CardElement 
        className="card-field"
        onChange={ e => setIsCardComplete(e.complete) }
        style={{
          base: { fontSize: "16px", fontFamily: '"Open Sans", sans-serif' }
        }}
      />
      <LoaderButton
        type="submit"
        variant="primary"
        isLoading={ isLoading }
        block
      >
        <span role="img" aria-label="card-emoji">💳</span> Confirm
      </LoaderButton>
    </Form>
  )
}

export default injectStripe(BillingForm);
