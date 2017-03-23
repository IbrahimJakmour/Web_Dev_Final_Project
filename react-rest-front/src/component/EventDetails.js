import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class EventDetails extends React.Component {
    constructor() {
        super();
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = ({
            event: []
        })
    }

    handleConfirm(e) {
        event.preventDefault();
        console.log('hello!!')
        axios.post('http://localhost:8080/events/:event_id/attendees')
            .then(response => {
                console.log('this is the response');
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillMount() {
        const event_id = this.props.params.event_id
        axios.get('http://localhost:8080/events/' + event_id , { headers: { 'authorization': localStorage.authToken } })
            .then(response => {
                this.setState({
                    event: response.data
                }
                )
                console.log(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid background_login">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 square">
                        <div className="card-block">
                          <h1>Event Details</h1>
                            <h4 className="card-title">{this.props.name}</h4>
                            <p className="card-text">{this.props.comment}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Date: {this.props.date_time}</li>
                            <li className="list-group-item">Time: {this.props.date_time}</li>
                            <li className="list-group-item">Distance:{this.state.event.distance}</li>
                            <li className="list-group-item">Pace: {this.props.minPace} to {this.props.maxPace}</li>
                            <li></li>
                        </ul>
                        <label>
                            <input type="checkbox" checked={this.props.bag ? true : false} /> Bag Drop Available
                 </label>
                        <div className="card-block">
                            <button className="btn btn-secondary" type="submit" onChange={this.handleConfirm}>{/*<Link to="/confirmation">Attend</Link>*/}Attend</button>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
                )
    }
}

export default EventDetails;