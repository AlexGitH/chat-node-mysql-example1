// import logo from './logo.svg';
import './App.css';
import MessageInputs from './components/MessageInputs';
import MessageList from './components/MessageList';
import store from './store/reducers'
import {Provider, connect}   from 'react-redux';
import {
  actionSendAndCheck,
  actionCheckLoopOn,
  actionCheckLoopOff,
  actionGetAndAppend
} from './store/actions'

const LOOP_DELAY = 2000;
// const RELEASE_NEW_DELAY = 2000;
// const VISIBLE_MESSAGE_NUMBER = 100;
const RECONNECT_DELAY = 30000;
// const URL = 'http://students.a-level.com.ua:10012';
// const USE_FETCH = true;
const delay = ms => new Promise(ok=>setTimeout( ()=>ok(ms), ms ));

store.dispatch( actionCheckLoopOn() );

const CMessageInputs = connect( state=>({
  isCheckLoopOn: state.uiState.isCheckLoopOn
}), dispatch => ({
  sendAndCheck : (nick,message) => dispatch( actionSendAndCheck( nick, message ) ),
  setCheckLoopOn : () => dispatch( actionCheckLoopOn() ),
  setCheckLoopOff : () => dispatch( actionCheckLoopOff() )
}))( MessageInputs )

const CMessageList = connect( state=>({
  messages: state.messages
}))( MessageList );


( async ()=>{
  while(true) {
    if( store.getState().uiState.isCheckLoopOn ){
      try {
        const lastMessageId = store.getState().messages.nextMessageId;
        await store.dispatch( actionGetAndAppend( lastMessageId ) );
      }
      catch (err) {
        console.warn('Loop Error:', err);
        await delay( RECONNECT_DELAY );
      }
    }
    await delay( LOOP_DELAY );
  }
})();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CMessageInputs/>
        <CMessageList />
      </div>
    </Provider>
  );
}

export default App;
