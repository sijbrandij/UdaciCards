import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddDeck from './components/AddDeck'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AddDeck />
        </View>
      </Provider>
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