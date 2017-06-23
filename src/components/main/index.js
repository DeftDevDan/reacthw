import React, {Component} from 'react';
import Saved from '../saved';
import Search from '../search';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';


export default class Main extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Search}/>
					<Route path="/saved" component={Saved}/>
				</div>
			</Router>
		)
	}
}