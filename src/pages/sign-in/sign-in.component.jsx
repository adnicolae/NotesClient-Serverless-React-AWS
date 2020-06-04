import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { Form } from 'react-bootstrap'; 
import onError from '../../helpers/onError';
import LoaderButton from '../../components/loader-button/loader-button.component';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/current-user.context';
import './sign-in.styles.scss';

const SignIn = () => {
  const { setIsAuthenticated } = useContext(CurrentUserContext);
  const [ credentials, setCredentials ] = useState({ email: '', password: '' });
  const [ isLoading, setIsLoading ] = useState(false);
  const history = useHistory();
  const { email, password } = credentials;

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    
    try {
      await Auth.signIn(email, password)
      setIsAuthenticated(true);
      history.push('/');
    } catch (error) {
      onError(error);
    }
    
    setIsLoading(false);
  }

  const handleChange = e => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value})
  }

  return (
    <div className="sign-in">
      <Form onSubmit={ handleSubmit }>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            size="lg"
            type="email"
            name="email" 
            placeholder="Email"
            value={ email }
            onChange={ handleChange } />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password" 
            name="password"
            placeholder="Password"
            value={ password }
            onChange={ handleChange } />
        </Form.Group>
        <LoaderButton isLoading={ isLoading } variant="primary" type="submit">
          Sign In
        </LoaderButton>
      </Form>
    </div>
  )
}

export default SignIn;
