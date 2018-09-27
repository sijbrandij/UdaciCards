import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from 'react-native'
import { parameterizeString } from '../utils/helpers'
import TextButton from './TextButton'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, purple } from '../utils/colors'

class AddDeck extends Component {
  state = {
    title: ''
  }
  submit = () => {
    const key = parameterizeString(this.state.title)
    const { deck } = this.state

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState({ title: '' })

    // route to home

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
          onChangeText={(title) => this.setState({title})}
        />
        <TextButton
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.submit}
        >
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TextButton>
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