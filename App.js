import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Gate from './components/Gate';
import store, {persistor} from './redux/store';

const cacheImages = images =>
  images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font))

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require("./assets/loginBg.jpg"),
      "http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png"
    ];

    const fonts = [Ionicons.font];
    const promiseImages = cacheImages(images);
    const promiseFonts = cacheFonts(fonts);

    return Promise.all([...promiseImages, ...promiseFonts]);
  }


  return isReady ? (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
        <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading 
        startAsync={loadAssets}
        onFinish={handleFinish}
        onError={console.error}
      />
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
