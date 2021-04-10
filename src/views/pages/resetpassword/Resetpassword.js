import React, { Component } from 'react'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class resetPassword extends Component {

    render() {
        return (
            <div className="content">
                <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header text-center">Reset Password</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password"  className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label >Confirm Password</label>
                                        <input type="password"  className="form-control" />
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <input type="button" value="Reset" className="btn btn-primary" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </form>
            </div>
        )
    }
}
