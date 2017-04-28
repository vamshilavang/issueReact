import {
	GET_RATES
} from '../constents';
const initialState = {
	raterInfo: []
};

export default function rates(state = initialState, action){
	switch(action.type){
		case GET_RATES: console.log(action);
		break;
		default	:
		console.log(action);
		return {...state};

	}
}
