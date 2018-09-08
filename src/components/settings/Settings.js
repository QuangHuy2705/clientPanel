import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit} from "../../actions/settingsAction";


class Settings extends Component { 
	disableBalanceOnAddChange = (e) => {
		const {setDisableBalanceOnAdd} = this.props;
		setDisableBalanceOnAdd();
	};

	disableBalanceOnEditChange = (e) => {
		const {setDisableBalanceOnEdit} = this.props;
		setDisableBalanceOnEdit();
	};

	allowRegistrationChange = (e) => {
		const {setAllowRegistration} = this.props;
		setAllowRegistration();
	}

	render() {
		const {disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration} = this.props.settings;
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/" className="btn btn-link">
							<i className="fas fa-arrow-circle-left"></i>
							{" "}Back to Dashboard
						</Link>
					</div>
				</div>
				<div className="card">
					<div className="card-header">Edit Settings</div>
					<div className="card-body">
						<form action="">
							<div className="form-group">
								<label htmlFor="">Allow Registration</label> {" "}
								<input onChange={this.allowRegistrationChange} type="checkbox" name="allowRegistration" checked={!!allowRegistration}/>
							</div>
							<div className="form-group">
								<label htmlFor="">Disable Balance On Add</label> {" "}
								<input onChange={this.disableBalanceOnAddChange} type="checkbox" name="disableBalanceOnAdd" checked={!!disableBalanceOnAdd}/>
							</div>
							<div className="form-group">
								<label htmlFor="">Disable Balance On Edit</label> {" "}
								<input onChange={this.disableBalanceOnEditChange} type="checkbox" name="disableBalanceOnEdit" checked={!!disableBalanceOnEdit}/>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
} ;

export default connect((state, props) => ({
	auth: state.firebase.auth,
	settings: state.settings
}), {setAllowRegistration, setDisableBalanceOnEdit, setDisableBalanceOnAdd})(Settings);