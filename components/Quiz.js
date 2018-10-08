import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons' // meh, smiley, frown-open
import { red, orange, green, white, purple } from '../utils/colors'

class Quiz extends Component {
  state = {
    finished: false,
    questionsAnswered: 0,
    questionsCorrect: 0,
    questionsToAnswer: [],
    showAnswer: false,
    currentQuestion: {},
  }

  reset = () => {
    let newQuestion = this.props.deck.questions[Math.floor(Math.random() * this.props.deck.questions.length)]
    this.setState({
      finished: false,
      questionsAnswered: 0,
      questionsCorrect: 0,
      questionsToAnswer: this.props.deck.questions,
      showAnswer: false,
      currentQuestion: newQuestion
    })
  }

  toDeck = () => {
    this.props.navigation.goBack()
  }

  nextQuestion = () => {
    const { questionsToAnswer, currentQuestion } = this.state
    const questionPool = questionsToAnswer.filter(question => (question !== currentQuestion))
    return questionPool[Math.floor(Math.random() * questionPool.length)]
  }

  saveCorrectAnswer = () => {
    this.setState(prevState => ({
      questionsAnswered: prevState.questionsAnswered + 1,
      questionsCorrect: prevState.questionsCorrect + 1,
      questionsToAnswer: prevState.questionsToAnswer.filter(element => element !== prevState.currentQuestion),
      showAnswer: false,
      currentQuestion: this.nextQuestion(),
    }))
  }

  saveIncorrectAnswer = () => {
    this.setState(prevState => ({
      questionsAnswered: prevState.questionsAnswered + 1,
      questionsToAnswer: prevState.questionsToAnswer.filter(element => element !== prevState.currentQuestion),
      showAnswer: false,
      currentQuestion: this.nextQuestion()
    }))
  }

  renderIcon = () => {
    const percentage = this.calculateScore()
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
        <FontAwesome name='frown-o' size={100} color={red} />
      )
    }
  }

  calculateScore = () => {
    const { questionsAnswered, questionsCorrect } = this.state
    if (questionsAnswered === 0 || questionsCorrect === 0) {
      return 0
    }
    result = ((questionsCorrect / questionsAnswered) * 100).toFixed(0)
    return result
  }

  renderScore = () => {
    const { questionsAnswered, questionsCorrect } = this.state
    const percentage = this.calculateScore()
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

  renderProgress = () => {
    const { deck } = this.props
    const { questionsAnswered } = this.state

    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressContainerText}>{questionsAnswered} / {deck.questions.length}</Text>
      </View>
    )
  }

  renderQuestion () {
    const { showAnswer, currentQuestion } = this.state

    if (showAnswer === true) {
      return (
        <View style={styles.titleContainer}>
          <Text>{currentQuestion.answer}</Text>
        </View>
      )
    }

    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{currentQuestion.question}</Text>
      </View>
    )
  }

  renderButtons = () => {
    const { showAnswer, currentQuestion } = this.state

    if (showAnswer === true) {
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={this.saveCorrectAnswer}>
            <Text style={styles.secondaryBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={this.saveIncorrectAnswer}>
            <Text style={styles.secondaryBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
        style={styles.ctaBtn}
          onPress={() => this.setState(prevState => ({showAnswer: !prevState.showAnswer}))}>
          <Text style={styles.ctaBtnText}>Show Answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentDidMount() {
    let question = this.props.deck.questions[Math.floor(Math.random() * this.props.deck.questions.length)]
    this.setState({
      currentQuestion: question,
      questionsToAnswer: this.props.deck.questions
    })
  }

  render() {
    const { finished, questionsAnswered, questionsCorrect, questionsToAnswer, currentQuestion } = this.state

    if (currentQuestion === {}) {
      return null
    }

    if (questionsToAnswer.length === 0) {
      return this.renderScore()
    }

    return (
      <View style={styles.container}>
        {this.renderProgress()}
        {this.renderQuestion()}
        {this.renderButtons()}
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

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId],
  }
}

export default connect(mapStateToProps)(Quiz)
