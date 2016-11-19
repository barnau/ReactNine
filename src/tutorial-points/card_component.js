import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import $ from 'jquery';

var Card = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentDidMount: function() {
		var component = this;
		console.log(this.props.login);
		$.get("https://api.github.com/users/" + this.props.login, function(data) {
			console.log(data);
			component.setState(data);
		});
	},
	render: function() {
		return (
			<div>
				<img src={this.state.avatar_url} width="80px"/>
				<h3>{this.state.login}</h3>
				<hr/>
			</div>
		);
	}
});

var Form = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var loginInput = ReactDOM.findDOMNode(this.refs.login);
		this.props.addCard(loginInput.value);
		loginInput.value ="";
	},
	render: function() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input placeholder="github login" ref="login"></input>
				<button>Add</button>
			</form>
		);
	}
});

var Main = React.createClass({
	getInitialState: function() {
		return {
			logins: []
		};
	},
	addCard: function(loginToAdd) {
		this.setState({
			logins: this.state.logins.concat(loginToAdd)
		});
	},
	render: function() {
		var cards = this.state.logins.map(function(login) {
			return ( <Card login={login} /> );
		});
			return (
				<div>
					<Form addCard={this.addCard}/>
					{cards}
				</div>
				);
		}
	});

ReactDOM.render(<Main/>, document.getElementById("root"));