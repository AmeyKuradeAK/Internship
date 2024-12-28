import Keycloak from 'keycloak-js';

// Initialize Keycloak instance
const keycloak = new Keycloak({
  url: 'http://localhost:8080',  // Keycloak server URL
  realm: 'image-classifier',    // Your realm
  clientId: 'react-app',        // Your React app client ID
});

// Function to initialize Keycloak only once
export const initKeycloak = (onAuthenticatedCallback: Function) => {
  if (!keycloak.authenticated) {
    console.log('Initializing Keycloak...');
    keycloak.init({
      onLoad: 'login-required',  // Force login when not authenticated
      checkLoginIframe: false,   // Disable login iframe to prevent errors
    }).then((authenticated: any) => {
      if (authenticated) {
        console.log('Authenticated');
        onAuthenticatedCallback();
      } else {
        console.log('Authentication failed');
      }
    }).catch((error: any) => {
      console.error('Error during Keycloak initialization:', error);
    });
  } else {
    console.log('Keycloak is already authenticated.');
    onAuthenticatedCallback();
  }
};

// Get the Keycloak instance, ensure it is initialized
export const getKeycloak = () => {
  if (!keycloak) {
    console.error('Keycloak instance is not initialized.');
  }
  return keycloak;
};
