import "./styles.css";

import { useEffect } from "react";
import { connect } from "react-redux";


function App({dispatch}) {

  useEffect(()=>{
   dispatch({
    type: 'WEBSOCKET:CONNECT',
    payload: { url:'wss://api-pub.bitfinex.com/ws' }
  })
  },[]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default connect()(App);



