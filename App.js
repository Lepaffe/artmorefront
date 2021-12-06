import { StatusBar } from 'expo-status-bar';
import React from 'react';

import SwipeScreen from './screens/SwipeScreen'
import ArtworkScreen from './screens/ArtworkScreen';

import selectedArtwork from './reducers/selectedArtwork'
import selectedArtist from './reducers/selectedArtist'

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ selectedArtwork, selectedArtist }));

export default function App() {
  return (
    <Provider store={store}>
      <ArtworkScreen />
    </Provider>
  );
}