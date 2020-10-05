import React from 'react';
import { Header, OfflineList } from '../components';
import { RouteComponentProps } from 'react-router';

export const OfflineQueuePage: React.FC<RouteComponentProps> = ({ match }) => {

  // TODO
  const queue = { entries: [] };

  return (
    <>
      <Header title="Offline Queue" backHref="/tasks" match={match} />
      <OfflineList offlineStore={queue.entries} />
    </>
  );
};
