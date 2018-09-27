import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddDeck from './components/AddDeck'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AddDeck />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ecf0f1'
  }
})