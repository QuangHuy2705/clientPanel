import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect} from "react-redux-firebase";

class Navbar extends Component {
	state = {
		isAuthenticated: false
	}

	static getDerivedStateFromProps(props, state) {
		const {auth} = props;

		if(auth.uid) {
			return {isAuthenticated: true}
		} else {
			return {isAuthenticated: false}
		}
	}

	onLogOutClick = e => {
		e.preventDefault();
		const {firebase} = this.props;
		firebase.logout();
	}

	render() {
		const {allowRegistration} = this.props.settings;
		const {isAuthenticated} = this.state;
		const {auth} = this.props;
		return (
			<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">ClientPanel</Link>
					<button 
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarMain">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav mr-auto">
							{isAuthenticated ? (
								<li className="nav-item">
									<Link className="nav-link" to="/">Dashboard</Link>
								</li>
								) : null}
						</ul>

						{isAuthenticated && (
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<a href="#!" className="nav-link">{auth.email}</a>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/settings">Settings</Link>
								</li>
								<li className="nav-item">
									<a href="#!" className="nav-link" onClick={this.onLogOutClick}>Log Out</a>
								</li>
							</ul>
							)}	
						{(allowRegistration && !isAuthenticated) && (
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
								<li className="nav-item">
									<Link to="/register" className="nav-link">Register</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.proptypes = {
	firebase: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth,
		settings: state.settings
	}))
)(Navbar);