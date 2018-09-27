import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { parameterizeString } from '../utils/helpers'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

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

    // save to 'db'
  }
  render() {
    const { title } = this.state
    return (
      <View>

        <Text>Text</Text>
        <Text>More text</Text>
        <Text>Add Deck</Text>
        <TextInput
          value={title}
          placeholder='New deck title'
          onChangeText={(title) => this.setState({title})}
        />
        <SubmitBtn onPress={this.submit} />
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    )
  }
}