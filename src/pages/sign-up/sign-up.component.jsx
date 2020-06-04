import React, { useContext, useState } from 'react'
import { useFormFields } from '../../helpers/customHooks';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user.context';
import { Form } from 'react-bootstrap';
import LoaderButton from '../../components/loader-button/loader-button.component';
import { Auth } from 'aws-amplify';

import './sign-up.component.scss';
import onError from '../../helpers/onError';

const SignUp = () => {
  const history = useHistory();
  const [ fields, handleFieldChange ] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  });
  const { email, password, confirmPassword, confirmationCode } = fields;
  const { setIsAuthenticated } = useContext(CurrentUserContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ user, setUser ] = useState(null);

  const handleConfirmationSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);

      setIsAuthenticated(true);
      history.push('/');
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const user = await Auth.signUp({
        username: email,
        password
      });

      setIsLoading(false);
      setUser(user);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  const ConfirmationForm = () => {
    return (
      <Form onSubmit={ handleConfirmationSubmit }>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            size='lg'
            type='tel'
            onChange={ handleFieldChange }
            value={ confirmationCode }
          />
          <Form.Text className="help-block" muted>
            The confirmation code has been sent to your email.
          </Form.Text>
        </Form.Group>
        <LoaderButton isLoading={ isLoading } variant="primary" type="submit">
          Verify
        </LoaderButton>
      </Form>
    );
  }

  const SignUpForm = () => {
    return (
      <Form onSubmit={ handleSignupSubmit }>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            size="lg"
            type="email"
            name="email" 
            placeholder="Email"
            value={ email }
            onChange={ handleFieldChange } />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password" 
            name="password"
            placeholder="Password"
            value={ password }
            onChange={ handleFieldChange } />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password"
            value={ confirmPassword }
            onChange={ handleFieldChange } />
        </Form.Group>
        <LoaderButton isLoading={ isLoading } variant="primary" type="submit">
          Sign Up
        </LoaderButton>
      </Form>
    )
  }

  return (
    <div className='sign-up'>
      {
        !user
        ? SignUpForm()
        : ConfirmationForm()
      }
    </div>
  )
}

export default SignUp;
