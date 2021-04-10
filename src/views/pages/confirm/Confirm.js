import React, { Component} from 'react'

import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default class confirm extends Component {


    render() {



        return (
            <div className="content">
                <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header text-center">Confirm Password</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label >User Id</label>
                                        <input type="text"  className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="text"  className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label >Confirmation code</label>
                                        <input type="text"   className="form-control" />
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <input type="button" value="Submit" className="btn btn-primary" />
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

