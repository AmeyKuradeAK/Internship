import React, { useState, useEffect, useRef } from 'react';
import { initKeycloak, getKeycloak } from './keycloak';

const App: React.FC = () => {
  const [keycloak, setKeycloak] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false); // Track initialization state
  const keycloakInitializedRef = useRef(false); // Reference to check initialization status

  useEffect(() => {
    // Initialize Keycloak only if it hasn't been initialized yet
    if (!keycloakInitializedRef.current) {
      console.log('Initializing Keycloak...');
      initKeycloak(() => {
        console.log('Keycloak initialized');
        setKeycloak(getKeycloak());
        setAuthenticated(true);
        setInitialized(true); // Set initialized to true once Keycloak is initialized
      });
      keycloakInitializedRef.current = true; // Set to true to prevent re-initialization
    }
  }, []); // Empty dependency array to ensure it runs only once

  const handleLogout = () => {
    const keycloakInstance = getKeycloak();
    if (keycloakInstance) {
      console.log('Logging out...');
      keycloakInstance.logout().then(() => {
        console.log('Logged out successfully');
        setAuthenticated(false);  // Update authenticated state
      }).catch((error: any) => {
        console.error('Logout failed:', error);
      });
    }
  };

  if (!keycloak) {
    return <div>Loading...</div>;  // Show loading while Keycloak is being initialized
  }

  if (!authenticated) {
    return <div>Authentication in progress...</div>;  // Show loading while waiting for authentication
  }

  return (
    <div className="App">
      <h1>Keycloak Authentication Complete</h1>
      <p>User: {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
