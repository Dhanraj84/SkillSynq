import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: 'https://skill-synq.vercel.app/' }} 
        style={styles.webview}
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Matches your website's dark background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
});
