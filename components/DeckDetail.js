import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { white, purple, gray } from '../utils/colors'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title: title
		}
	}
	render() {
		const { deck, navigation } = this.props
		const numberOfQuestions = deck.questions.length
		return (
		  <View style={styles.container}>
		  	<View style={styles.titleContainer}>
			    <Text style={styles.title}>{deck.title}</Text>
			    <Text style={styles.subTitle}>{deck.questions.length} cards</Text>
			  </View>
		    <TouchableOpacity
		    	onPress={() => console.log('Pressed quiz')}
		    	disabled={numberOfQuestions === 0}
		    	style={numberOfQuestions > 0 ? styles.ctaBtn : styles.disabledBtn}
		    >
		    	<Text style={numberOfQuestions > 0 ? styles.ctaBtnText : styles.disabledBtnText}>Start Quiz</Text>
	    	</TouchableOpacity>
	    	<TouchableOpacity
	    		onPress={() => this.props.navigation.navigate(
          'AddQuestion',
          { deckId: navigation.state.params.deckId, title: deck.title }
        )}
	    		style={numberOfQuestions > 0 ? styles.secondaryBtn : styles.ctaBtn}
	    	>
	    		<Text style={numberOfQuestions > 0 ? styles.secondaryBtnText : styles.ctaBtnText}>Add another question</Text>
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
	disabledBtn: {
		flex: 1,
		width: '100%',
		paddingTop: 20,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		borderWidth: 1,
		borderColor: gray,
		marginBottom: 20,
	},
	disabledBtnText: {
		fontSize: 24,
		color: gray,
	},
})

function mapStateToProps (state, { navigation }) {
	const { deckId } = navigation.state.params

	return {
		deckId,
		deck: state[deckId],
	}
}

export default connect(mapStateToProps)(DeckDetail)