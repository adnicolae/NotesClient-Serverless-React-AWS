import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import config from '../../config/config';
import BillingForm from '../../components/billing-form/billing-form.component';
import { Elements, StripeProvider } from 'react-stripe-elements';

import './settings.styles.scss';
import onError from '../../helpers/onError';

const SettingsPage = () => {
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ stripe, setStripe ] = useState(null);

  const billUser = details => API.post("notes", "/billing", {
    body: details
  });

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  const handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storagePreference: storage,
        source: token.id
      });
      alert('Your card has been charged successfully!');
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="settings">
      <StripeProvider stripe={ stripe }>
        <Elements>
          <BillingForm isLoading={ isLoading } onSubmit={ handleFormSubmit } />
        </Elements>
      </StripeProvider>
    </div>
  )
}

export default SettingsPage;
