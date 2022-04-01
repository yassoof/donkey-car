import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }, props) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const navigate = useNavigate();  

  if(window.sessionStorage.getItem('url') === null) {
    window.sessionStorage.setItem('url', window.location.href);
  }
  

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.sessionStorage.getItem('url'));
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.sessionStorage.getItem('url')}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;