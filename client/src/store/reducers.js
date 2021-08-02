/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// promise
const promiseReducer = ( state = {},
                            { type, status, payload, error, name } ) =>
  ( type === 'PROMISE' ? { ...state, [name]: { status, payload, error } } : state )

// sync func
const messagesReducer = ( state = { data: [], nextMessageId: 0 },
                         { type, data, nextMessageId } ) => {
  const indexDesc = ( a, b ) => b.index - a.index
  const updateModel = newData => newData.sort( indexDesc ).map( ( x, i ) => ( x.isNew = state.nextMessageId > 0, x.id = state.nextMessageId + i, x ) )
  const releaseNewIndicator = ( newData, stateData ) => ( newData.forEach( x => stateData[x.id] = { ...x, isNew: false } ), stateData )
  if ( type === 'ADD_MESSAGE' ) return { ...state, data: updateModel( [ ...state.data, ...data ] ), nextMessageId }
  if ( type === 'NOT_NEW_MESSAGE' ) return { ...state, data: [...releaseNewIndicator( data, state.data )], nextMessageId }
  return state //'DEFAULT'
}

const uiStateReducer = ( state = {}, { type, name } ) => {
  switch ( type ) {
    case 'CHECK_LOOP_ON' : return { ...state, [name]: true };
    case 'CHECK_LOOP_OFF' : return { ...state, [name]: false };
    default : return state;
  }
}

const store = createStore( combineReducers( {
  promise  : promiseReducer,
  messages : messagesReducer,
  uiState  : uiStateReducer
} ), applyMiddleware( thunk ) )

window.store = store  // DEBUG: for test only

export default store
