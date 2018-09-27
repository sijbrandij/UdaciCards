import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import { parameterizeString } from '../utils/helpers'
import TextButton from './TextButton'
import { addDeck } from '../utils/api'

export default class AddDeck extends Component {
  state = {
    title: ''
  }
  submit = () => {
    const key = parameterizeString(this.state.title)
    const { deck } = this.state

    // Update Redux

    this.setState({ title: '' })

    // route to home

    submitDeck({ key, deck })
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView>

        <Text>Text</Text>
        <Text>More text</Text>
        <Text>Add Deck</Text>
        <TextInput
          style={styles.input}
          value={title}
          behavior='padding'
          placeholder='New deck title'
          onChangeText={(title) => this.setState({title})}
        />
        <TextButton onPress={this.submit}>
          <Text>SUBMIT</Text>
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    margin: 50,
  }
})