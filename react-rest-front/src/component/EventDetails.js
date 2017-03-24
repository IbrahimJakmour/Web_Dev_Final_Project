import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import AlertContainer from 'react-alert';

class EventDetails extends React.Component {
    constructor() {
        super();
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state = ({
            events: { date_time: '', attendees: [] }
        })
        this.alertOptions = {
            offset: 14,
            position: 'bottom left',
            theme: 'dark',
            time: 5000,
            transition: 'scale'
        };
    }

    handleConfirm(e) {
        event.preventDefault();
        const eventId = this.state.events._id
        const userId = JSON.parse(localStorage.user)._id
        console.log()
        axios.post('http://localhost:8080/events/' + eventId + '/attendees', { id: userId }, { headers: { 'authorization': localStorage.authToken } })
            .then(response => {
                console.log('this is the response');
                 this.msg.show('you are signed in', {
                    time: 10000,
                    type: 'success',
                    icon: <img src="" />
                });

            })
            .catch(err => {
                this.msg.show('user already signed up', {
                    time: 10000,
                    type: 'success',
                    icon: <img src="" />
                });

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
        const scheduledDate = this.state.events.date_time.toString().substr(0, 10)
        const scheduledTime = this.state.events.date_time.toString().substr(11, 5);
        console.log(scheduledDate, scheduledTime)

        const attendeesArray = this.state.events.attendees.map((element, i) => {
            return <li className="list-group-item" key={i}> {element.username} </li>
        })
        console.log(attendeesArray)

        return (
            <div className="container-fluid background_login">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 square">
                        <div className="card-block-event-details text-center">
                            <h2>Event Details</h2>
                            <h4 className="card-title">{this.state.events.name}</h4>
                            <p className="card-text">{this.state.events.comment}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Date: {scheduledDate}</li>
                                <li className="list-group-item">Time: {scheduledTime}</li>
                                <li className="list-group-item">Distance: {this.state.events.distance} km</li>
                                <li className="list-group-item">Pace: {this.state.events.minPace} min/km to {this.state.events.maxPace} min/km </li>
                                <li li className="list-group-item">Location: {this.state.events.location_start}</li>
                                <li className="list-group-item">Route Details: Coming Soon!</li>
                            </ul>
                            <h2>Who's going:</h2>
                            <ul className="list-group list-group-flush">
                                {attendeesArray}
                            </ul>
                            <label>
                                <input type="checkbox" checked={this.state.events.bag ? true : false} /> Bag Drop Available
                         </label>
                            <div className="card-block">
                                <button className="btn btn-secondary" onClick={this.handleConfirm}>{/*<Link to="/confirmation">Attend</Link>*/}Attend</button>
                                 <button className="btn btn-secondary"><Link to="/calendar">Back</Link></button>
                            </div>

                        </div>


                    </div>
                    <div className="col-md-4"></div>
                </div>

                <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
            </div>
        )
    }
}

export default EventDetails;