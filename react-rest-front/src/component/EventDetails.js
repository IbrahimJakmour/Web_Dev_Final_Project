import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class EventDetails extends React.Component {
    constructor() {
        super();
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = ({
            events: { attendees: [] }
        })
    }

    handleConfirm(e) {
        event.preventDefault();
        const eventId = this.state.events._id
        const userId = JSON.parse(localStorage.user)._id
        console.log()
        axios.post('http://localhost:8080/events/' + eventId + '/attendees', { id: userId }, { headers: { 'authorization': localStorage.authToken } })
            .then(response => {
                location.href=('/calendar')
                console.log('this is the response');
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillMount() {
        const event_id = this.props.params.event_id
        axios.get('http://localhost:8080/events/' + event_id, { headers: { 'authorization': localStorage.authToken } })
            .then(response => {
                console.log('here', response.data)
                this.setState({
                    events: response.data
                }
                )
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const attendeesArray = this.state.events.attendees.map((element, i) => {
            return <li> {element.username} </li>
        })
        console.log(attendeesArray)

        return (
            <div className="container-fluid background_login">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 square">
                        <div className="card-block">
                            <h1>Event Details</h1>
                            <h4 className="card-title">{this.state.events.name}</h4>
                            <p className="card-text">{this.state.events.comment}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Date: {this.state.events.date_time}</li>
                            <li className="list-group-item">Time: {this.state.events.date_time}</li>
                            <li className="list-group-item">Distance: {this.state.events.distance} km</li>
                            <li className="list-group-item">Pace: {this.state.events.minPace} min/km to {this.state.events.maxPace} min/km </li>
                        </ul>
                        <ul>
                            {attendeesArray}
                        </ul>
                        <label>
                            <input type="checkbox" checked={this.state.events.bag ? true : false} /> Bag Drop Available
                 </label>
                        <div className="card-block">
                            <button className="btn btn-secondary" onClick={this.handleConfirm}>{/*<Link to="/confirmation">Attend</Link>*/}Attend</button>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}

export default EventDetails;