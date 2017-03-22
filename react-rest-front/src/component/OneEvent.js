import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class OneEvent extends React.Component {
    render() {

        return (
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-block card-header">
                        <h4 className="card-title">{this.props.name}</h4>
                        <p className="card-text">{this.props.comment}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Date:{this.props.date_time}</li>
                        <li className="list-group-item">Time: {this.props.date_time}</li>
                        <li className="list-group-item">Distance:{this.props.distance}</li>
                        <li className="list-group-item">Pace: {this.props.minPace} to {this.props.maxPace}</li>
                    </ul>
                    <label>
                        <input type="checkbox" checked={this.props.bag ? true : false} /> Bag Drop Available
                     </label>
                    <div className="card-block">
                        <button><Link to={`/details/${this.props.event_id}`}>Event Details</Link></button>
                        <a href={this.props.route} className="card-link">Route link</a>
                    </div>
                </div>
            </div>

        )
    }
}
export default OneEvent;