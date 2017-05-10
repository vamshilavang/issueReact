import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './createStore';
import Emenu from './components/eMenu/eMenu';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
const store = createStore(reducers);

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
	      <div>
	        <div className="container" style={{marginTop: '10px'}}>
				<Router history={hashHistory}>
					<Route path="/" component={Emenu}/>
					<Route path="/print" component={Emenu}/>
				</Router>
	        </div>
	      </div>
	    </Provider>
    );
  }
}
export default App;
