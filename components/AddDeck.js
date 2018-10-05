import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { parameterizeString, FLASHCARDS_STORAGE_KEY } from '../utils/helpers'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: ''
  }
  toDeck = (key, title) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: key, title: title }
    )
  }
  submit = () => {
    const { title } = this.state
    const key = parameterizeString(title)
    const deck = {
      title: title,
      questions: []
    }

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState({ title: '' })

    this.toDeck(key, deck.title)

    submitDeck({ key, deck })
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Add Deck</Text>
        <TextInput
          style={styles.input}
          value={title}
          behavior='padding'
          placeholder='New deck title'
          onChangeText={(title) => this.setState({title: title})}
        />
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={this.submit}
        >
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    margin: 50,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

export default connect()(AddDeck)