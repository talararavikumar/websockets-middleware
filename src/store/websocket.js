

let websocket;

/**
 * An example middleware to handle WebSocket connections.
 * NB: There is no exception handling!
 */
const socketmiddleware = store => next => action => {
  switch (action.type) {
    // User request to connect
    case 'WEBSOCKET:CONNECT':
      // Configure the object
      websocket = new WebSocket(action.payload.url);

      // Attach the callbacks
      websocket.onopen = () => {
        let msg = JSON.stringify({ 
          event: 'subscribe', 
          channel: 'ticker', 
          symbol: 'tBTCUSD' 
        })
        websocket.send(msg)
        store.dispatch({ type: 'WEBSOCKET:OPEN' })};
      websocket.onclose = (event) => {
        console.log(event)
        return store.dispatch({ type: 'WEBSOCKET:CLOSE', payload: event })
      };
      websocket.onmessage = (event) => 
      {
        console.log(event);
    
        return store.dispatch({ type: 'WEBSOCKET:MESSAGE', payload: event })};

      break;

    // User request to send a message
    case 'WEBSOCKET:SEND':
      websocket.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case 'WEBSOCKET:DISCONNECT':
      websocket.close();
      break;

    default: // We don't really need the default but ...
      break;
  };

  return next(action);
};

export default socketmiddleware;