import React, {Component} from "react";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect} from "react-redux-firebase";
import {notifyUser} from "../../actions/notifyAction";
import Alert from "../layout/Alert";

class Login extends Component {
	state = {
		email: "",
		password: ""
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	onSubmit = e => {

		e.preventDefault();
		const {firebase} = this.props;
		const {email, password} = this.state;
		firebase.login({email, password})
			.then(() => this.props.notifyUser("", ""))
			.catch(e => this.props.notifyUser("Invalid Login Credentials", "error"))
		
	}

	render() {
		const {message, messageType} = this.props.notify;
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							{message && (<Alert message={message} messageType={messageType}/>)}
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<i className="fas fa-lock"></i>
									{" "}Login
								</span>
							</h1>

							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email: </label>
									<input onChange={this.onChange} type="text" name="email" className="form-control" required value={this.state.email}/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password: </label>
									<input onChange={this.onChange} type="password" name="password" className="form-control" required value={this.state.password}/>
								</div>

								<input type="submit" value="Login" className="btn btn-primary btn-block"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.proptypes = {
	firebase: PropTypes.object.isRequired
}

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		notify: state.notify
	}),
		{notifyUser}
	)
)(Login);

