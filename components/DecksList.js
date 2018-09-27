import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'

class DecksList extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then(({ decks }) => dispatch(receiveDecks(decks)))
  }
  renderItem = ({ title }, key) => (
    <View key={key}>
      <Text>{title}</Text>
    </View>
  )
  render() {
    return (
      <Text>{JSON.stringify(this.props)}</Text>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(DecksList)