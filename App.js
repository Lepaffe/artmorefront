import { StatusBar } from 'expo-status-bar';
import React from 'react';

import SwipeScreen from './screens/SwipeScreen'
import selectedArtwork from './reducers/selectedArtwork'

/*import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ selectedArtwork }))*/

export default function App() {
  return (
    //<Provider store={store}>
    <SwipeScreen />
    //</Provider>
  );
}