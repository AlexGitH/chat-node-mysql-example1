import store from './reducers'
import { jsonPost, jsonFetchGet } from '../utils/jsonPost'
const URL = '/messages';

// promise
const actionPending = name => ( { type: 'PROMISE', status: 'PENDING', name } )
const actionResolved = ( name, payload ) => ( { type: 'PROMISE', status: 'RESOLVED', payload, name } )
const actionRejected = ( name, error ) => ( { type: 'PROMISE', status: 'REJECTED', error, name } )

const actionPromise = ( name = 'default', p = Promise.resolve() ) =>
  async dispatch => {
    dispatch( actionPending( name ) )
    try {
      const payload = await p
      dispatch( actionResolved( name, payload ) )
      return payload
    } catch ( error ) {
      dispatch( actionRejected( name, error ) )
    }
  }

const actionCheckLoopOn = () => ( { type: 'CHECK_LOOP_ON', name: 'isCheckLoopOn', value: true } );
const actionCheckLoopOff = () => ( { type: 'CHECK_LOOP_OFF', name: 'isCheckLoopOn', value: false } );

// ACTION CREATORS
// const actionNotNew = data => ( { type: 'NOT_NEW_MESSAGE', data: data, nextMessageId: store.getState().messages.nextMessageId } )

const actionAppendMessage = response => ( {
  ...response,
  type : response.nextMessageId !== store.getState().messages.nextMessageId
          ? 'ADD_MESSAGE' : 'DEFAULT'
} )

const actionSendMessage = ( nick, message ) =>
  async dispatch => {
    const name = 'send';
    const conf = {
      nick,
      message
    };
    return await dispatch( actionPromise( name, jsonPost( URL, conf ) ) );
  }

const actionGetMessages = ( messageId = 0 ) =>
  async dispatch => {
    const name = 'get';
    return await dispatch( actionPromise( name, jsonFetchGet( URL, messageId ) ) );
  }

const actionGetAndAppend = ( messageId = 0 ) =>
  async dispatch => {
    await dispatch( actionGetMessages( messageId ) );
    const { payload, error } = store.getState().promise.get;
    if ( error ) throw new Error( `Fail to get messages: ${error}` );
    await dispatch( actionAppendMessage( payload ) );
  }

const actionSendAndCheck = ( nick, message ) =>
  async dispatch => {
    await dispatch( actionSendMessage( nick, message ) )
    const nextId = store.getState().messages.nextMessageId;
    const result = await dispatch( actionGetAndAppend( nextId ) );
    const { error } = store.getState().promise.get;
    if ( error ) throw new Error( error );
    return result;
  }

export {
  // actionPromise,
  actionCheckLoopOn,
  actionCheckLoopOff,
  // actionNotNew,
  // actionCheckLoopToggle,
  actionGetAndAppend,
  // actionAppendMessage,
  actionSendAndCheck
}
