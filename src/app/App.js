import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './createStore';
import Emenu from './components/eMenu/eMenu';
const store = createStore(reducers);

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
	      <div>
	        <div className="container" style={{marginTop: '10px'}}>
	          <Emenu />
	        </div>
	      </div>
	    </Provider>
    );
  }
}
export default App;
