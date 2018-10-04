import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { white, pink } from '../utils/colors'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckId } = navigation.state.params
		return {
			title: deckId
		}
	}
	render() {
		const { deck } = this.props
		return (
		  <View style={styles.container}>
		  	<View style={styles.titleContainer}>
			    <Text style={styles.title}>{deck.title}</Text>
			    <Text style={styles.subTitle}>{deck.questions.length} cards</Text>
			  </View>
		    <TouchableOpacity
		    	onPress={() => console.log('Pressed quiz')}
		    	style={styles.quizBtn}
		    >
		    	<Text style={styles.quizBtnText}>Start Quiz</Text>
	    	</TouchableOpacity>
	    	<TouchableOpacity
	    		onPress={() => console.log('Pressed add new question')}
	    		style={styles.newQuestionBtn}
	    	>
	    		<Text style={styles.newQuestionBtnText}>Add another question</Text>
	    	</TouchableOpacity>
		  </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: white,
    padding: 20,
    alignItems: 'center',
	},
	titleContainer: {
		flex: 4,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 36,
	},
	subTitle: {
		fontSize: 22,
	},
	quizBtn: {
		flex: 1,
		width: '100%',
		height: 30,
		paddingTop: 20,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: pink,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		marginBottom: 20,
	},
	newQuestionBtn: {
		flex: 1,
		width: '100%',
		paddingTop: 20,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		borderWidth: 1,
		borderColor: pink,
		marginBottom: 20,
	},
	quizBtnText: {
		fontSize: 24,
		color: white,
	},
	newQuestionBtnText: {
		fontSize: 24,
		color: pink,
	}
})

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params

	return {
		deckId,
		deck: state[deckId],
	}
}

export default connect(mapStateToProps)(DeckDetail)