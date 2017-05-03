import {
	GET_RATES
} from '../constants/index.js';
const initialState = {
	ratesInfo: []
};

export default function rates(state = initialState, action){
	switch(action.type){
		case GET_RATES:
		console.log('action',action);
		return {...state, ratesInfo: action.values.data.Products};
		break;
		default	:
		console.log(action);
		return {...state};

	}
}
