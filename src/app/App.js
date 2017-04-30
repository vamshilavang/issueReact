import React, { Component } from 'react';
import { Provider } from 'react-redux';
import dummyView from './actions/requiredProviderAction'
import configureStore from './createStore/createStore';
import RequireProvider from './components/eMenu/reqProviderView/index';
//import Emenu from './components/eMenu/eMenu';


const store = configureStore();
store.dispatch(dummyView())

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
	      <div>
	        <div className="container">
	          <RequireProvider />
	        </div>
	      </div>
	    </Provider>
    );
  }
}
export default App;
