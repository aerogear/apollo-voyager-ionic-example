import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Loading } from './components/Loading';
import { IContainerProps } from './declarations';
import { getKeycloakInstance } from './auth/keycloakAuth';

let keycloak: any;

export const AppContainer: React.FC<IContainerProps> = ({ app: App }) => {

  const [initialized, setInitialized] = useState(false);

  // Initialize the client
  useEffect(() => {
    const init = async () => {
      keycloak = await getKeycloakInstance();
      if (keycloak) {
        await keycloak?.loadUserProfile();
      }
      setInitialized(true);
    }
    init();
  }, []);

  if (!initialized) return <Loading loading={!initialized} />;

  // return container with keycloak provider
  return (
    <AuthContext.Provider value={{ keycloak, profile: keycloak?.profile }}>
      <App />
    </AuthContext.Provider>
  );
};
