import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decks ( state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck,
      }
    case ADD_QUESTION :
      const { question, deckId } = action
      const deck = state[deckId]
      return {
        ...state,
        [deckId]: {
          ...deck,
          questions: deck.questions.push([question])
        }
      }
    default :
      return state
  }
}

export default decks