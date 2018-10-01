import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { white, purple } from '../utils/colors'

class DecksList extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then(({ decks }) => dispatch(receiveDecks(decks)))
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
        DeckDetail,
        { deckId: key}
      )}
      style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subTitle}>{item.questions.length} cards</Text>
    </TouchableOpacity>
  )
  render() {
    const { decks } = this.props
    let decksList = []
    Object.keys(decks).map((key) => {
      decksList.push(decks[key])
    })
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What will you learn today?</Text>
        <FlatList
          data={decksList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 300,
    height: 100,
  },
  title: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
  },
  subTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
})

function mapStateToProps (state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DecksList)