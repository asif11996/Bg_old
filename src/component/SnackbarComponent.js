// SnackbarComponent.js

import React, {useEffect, useState} from 'react';
import {Snackbar} from 'react-native-paper';

const SnackbarComponent = ({visible, message, onDismiss}) => {
  useEffect(() => {
    let timer;

    if (visible) {
      // Show the Snackbar for 3 seconds (adjust as needed)
      timer = setTimeout(() => {
        onDismiss();
      }, 3000);
    }

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, [visible, onDismiss]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: 'Dismiss',
        onPress: onDismiss,
      }}>
      {message}
    </Snackbar>
  );
};

export default SnackbarComponent;
