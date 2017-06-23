import React, {Component} from 'react';
import Saved from '../saved';
import Search from '../search';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';


export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			saved: []
		};
	}

	savArticle = (article) => {
		axios
			.post("/api/saved", article)
			.then(response => {
				console.log(response);
				this.getSaved().bind(this);
			})
			.catch(err => {
				console.log(err);
			});
	};

	getSaved = () => {
		axios
			.get("/api/saved")
			.then(response => {
				console.log(response.data);
				this.setState({saved: response.data});
				return response;
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Search} saveArticle={this.saveArticle}/>
					<Route path="/saved" component={Saved} saved={this.state.saved}/>
				</div>
			</Router>
		)
	}
}