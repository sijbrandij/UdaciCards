import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons' // meh, smiley, frown-open
import { red, orange, green, white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class Quiz extends Component {
  state = { 
    finished: false,
    questionsAnswered: 0,
    questionsCorrect: 0,
  }

  reset = () => {
    this.setState({
      finished: false,
      questionsAnswered: 0,
      questionsCorrect: 0,
    })
  }

  toDeck = () => {
    this.props.navigation.goBack()
  }

  renderIcon = () => {
    const percentage = 80
    // calculate percentage
    if (percentage >= 75) {
      return (
        <FontAwesome name='smile-o' size={100} color={green} />
      )
    } else if (percentage >= 50) {
      return (
        <FontAwesome name='meh-o' size={100} color={orange} />
      )
    } else {
      return (
        <FontAwesome name='frown-o' size={100} color={orange} />
      )
    }
  }

  renderScore = () => {
    const { questionsAnswered, questionsCorrect } = this.state
    const percentage = 80
    // calculate percentage
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {this.renderIcon()}
          <Text style={styles.title}>You got {questionsCorrect} of {questionsAnswered} correct</Text>
          <Text style={styles.title}>That's {percentage}%</Text>
        </View>
        <TouchableOpacity
        style={styles.ctaBtn}
          onPress={this.reset}>
          <Text style={styles.ctaBtnText}>Reset quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={this.toDeck}>
          <Text style={styles.secondaryBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { finished, questionsAnswered, questionsCorrect } = this.state

    if (finished === false) {
      return this.renderScore()
    }

    return (
      <View style={styles.container}>
        <Text>Quiz</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 4,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  ctaBtn: {
    flex: 1,
    width: '100%',
    height: 30,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: purple,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    marginBottom: 20,
  },
  secondaryBtn: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderWidth: 1,
    borderColor: purple,
    marginBottom: 20,
  },
  ctaBtnText: {
    fontSize: 24,
    color: white,
  },
  secondaryBtnText: {
    fontSize: 24,
    color: purple,
  },
})

export default Quiz