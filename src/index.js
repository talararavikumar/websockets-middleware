import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware } from 'redux'
import {reducer} from './store/reducer';
import socketmiddleware from './store/websocket';
import App from "./App";

const createStoreWithMiddleware = applyMiddleware(socketmiddleware)(
  createStore
);

const store = createStoreWithMiddleware(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <Provider store={store}>

    <App />
    </Provider>
  </StrictMode>,
  rootElement
);
