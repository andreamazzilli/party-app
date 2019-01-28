import Immutable from 'immutable'
import { games } from '../../config'

const initialState = Immutable.fromJS( games )

export default ( state = initialState, action ) => {
  switch( action.type ){
    default:
      return state
  }
}
