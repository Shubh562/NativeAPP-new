import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const [connectionFailed, setConnectionFailed] = useState(false);

  const handleWebViewError = () => {
    setConnectionFailed(true);
  };

  return (
    <View style={styles.container}>
      {connectionFailed ? (
        <Text style={styles.errorText}>Failed to connect</Text>
      ) : (
        <WebView
          source={{ uri: 'http://jpl.dflare.io:8080/' }}
          javaScriptEnabled={true}
          onError={handleWebViewError}
          renderError={() => <Text style={styles.errorText}>Failed to load content</Text>}
          startInLoadingState
          renderLoading={() => <ActivityIndicator style={styles.loader} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    padding: 20,
    color: 'red',
  },
});

export default App;
