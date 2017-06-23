import React, {Component} from 'react';
import {
	Panel,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Button,
	Grid,
	Col
} from 'react-bootstrap';
import axios from 'axios';

const API_KEY = "daa03b61d31342fe81e712de72412b28";

const FieldGroup = ({id, label, help, ...props}) => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
		</FormGroup>
	);
}

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: "",
			start: "",
			end: "",
			results: ['something']
		};
	}

	handleSearch = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	search = (e) => {
		let {topic, start, end} = this.state;
		let startDate = "";
		let endDate = "";
		e.preventDefault();

		let params = {
			'api-key': API_KEY,
			query: ( topic )
		}

		if(start && end) {
			params.begin_date = start.replace(/-/g, '');
			params.end_date = end.replace(/-/g, '');
		}

		if (topic && topic !== "") {
			axios
				.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
					params: params
				})
				.then((response) => {
					let articles = response.data.response.docs.map((article) => {
						let obj = {};
						obj.nytid = article._id;
						obj.title = article.snippet;
						obj.link = article.web_url
					});
					this.setState({results: articles})
				})
				.catch((err) => console.log(err));
		} else {
			alert("No topic");
		}
	}

	renderResults = () => {
		if(this.results) {
			return this.results.map(
				(article) => {
					return (
						<Panel className="show-grid text-left" key={article.nytid} >
							<Col xs={10} bsSize="small">
								{article.title}
							</Col>
							<Col xs={2}>
								<Button bsSize="small" bsStyle="primary" onClick={() => this.props.saveArticle(article)}>Save</Button>
							</Col>
						</Panel>
					);
				}
			);			
		} else {
			return;
		}

	}

	render() {
		return (
			<div>
				<Panel header="Search" bsStyle="info">
					<Form>
						<FieldGroup name="topic" type="text" label="Topic" placeholder="Enter Topic" value={this.topic} onChange={this.handleSearch} />
						<FieldGroup name="start" type="date" label="Start" placeholder="Choose Start Date" value={this.start} onChange={this.handleSearch} />
						<FieldGroup name="end" type="date" label="End" placeholder="Choose End Date" value={this.end} onChange={this.handleSearch} />
						<Button type="submit" onClick={this.search.bind(this)}>Search</Button>
					</Form>
				</Panel>
				<div>
					<Panel header="Results" bsStyle="info">
						<Grid>
							{this.renderResults()}
						</Grid>
					</Panel>
				</div>
			</div>
		)
	}
}