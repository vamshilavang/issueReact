import {GET_RATES} from '../constants/index';
import {data} from '../mockAPI/rate-request-body';
import axios from 'axios';

export var setInitialValues = (values) => {
	return {
		type: 'SET_INITIAL_VALUES',
		values
	}
}

export const getDelarRates = (dispatch) => {
	var config = {
			headers: { 'Content-Type': 'application/json' }
	};
				const url = 'http://10.117.18.27:6220/Rating/RatingRESTAPI/json/rates_json';
				axios.post(url,data, config).then(function(response) {
				console.log(response);
				dispatch({type: GET_RATES, values: response});
});
}
