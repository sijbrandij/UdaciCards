import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'

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
		    <Text>{deck.title}</Text>
		    <Text>{deck.questions.length} cards</Text>
		    <TouchableOpacity
		    	onPress={() => console.log('Pressed quiz')}
		    >
		    	<Text>Start Quiz</Text>
	    	</TouchableOpacity>
	    	<TouchableOpacity
	    		onPress={() => console.log('Pressed add new question')}
	    	>
	    		<Text>Add another question</Text>
	    	</TouchableOpacity>
		  </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		padding: 15,
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