import { Capacitor } from '@capacitor/core/dist/esm/global';
import { DataStore } from 'offix-datastore';
import { schema, Task, Comment } from './generated';


let httpUri = 'http://localhost:4000/graphql';
let wsUri = 'ws://localhost:4000/graphql';

if (Capacitor.isNative && Capacitor.platform === 'android') {
  httpUri = 'http://10.0.2.2:4000/graphql';
  wsUri = 'ws://10.0.2.2:4000/graphql';
}

if (process.env.REACT_APP_URI_FORMAT === 'RELATIVEURI') {
  httpUri = "/graphql";
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const port = window.location.port !== "" ? `:${window.location.port}` : "";
  wsUri = `${protocol}${window.location.hostname}${port}${httpUri}`
}

export const datastore = new DataStore({
  dbName: "offix-datasync",
  replicationConfig: {
    client: {
      url: httpUri,
      wsUrl: wsUri,
    },
    delta: { enabled: true, pullInterval: 20000 },
    mutations: { enabled: false },
    liveupdates: { enabled: true }
  }
});

export const TaskModel = datastore.setupModel<Task>(schema.Task);
export const CommentModel = datastore.setupModel<Comment>(schema.Comment);

datastore.init();
