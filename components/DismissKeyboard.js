import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export  default ({children}) => {
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  )
}


