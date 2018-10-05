import React, { Component } from 'react'
import { 
	Text, 
	View, 
	TouchableOpacity, 
	StyleSheet, 
	TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { addQuestion } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, purple } from '../utils/colors'

class AddQuestion extends Component {
	state = {
		question: '',
		answer: ''
	}
	toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddQuestion'}))
  }
  submit = () => {
    const { question, answer } = this.state
    const { navigation, deckId, deck, dispatch } = this.props
    let newQuestion = { question: question, answer: answer }

    dispatch(addQuestion({
      deckId, newQuestion
    }))

    this.setState({ 
    	question: '', 
    	answer: '' 
    })

    // navigate to DeckDetail

    addQuestion({ deckId, newQuestion })
  }
	render() {
		const { question, answer } = this.state
		return (
			<KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Add Question</Text>
        <TextInput
          style={styles.input}
          value={question}
          behavior='padding'
          placeholder='New question'
          onChangeText={(question) => this.setState({question: question})}
        />
        <TextInput
          style={styles.input}
          value={answer}
          behavior='padding'
          placeholder='New answer'
          onChangeText={(answer) => this.setState({answer: answer})}
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
    alignItems: 'center',
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

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params

	return {
		deckId,
		deck: state[deckId],
	}
}

export default connect(mapStateToProps)(AddQuestion)