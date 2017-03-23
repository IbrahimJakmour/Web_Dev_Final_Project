import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class OneEvent extends React.Component {
    render() {
    
    const { date_time } = this.props;
    const concatDate = date_time.toString().substr(0,10);
    const concatTime = date_time.toString().substr(11,12) 

        return (
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-block card-header">
                        <h4 className="card-title">{this.props.name}</h4>
                        <p className="card-text">{this.props.comment}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Date: {concatDate}</li>
                        <li className="list-group-item">Time: {concatTime}</li>
                        <li className="list-group-item">Distance: {this.props.distance}</li>
                        <li className="list-group-item">Pace: {this.props.minPace} min/km to {this.props.maxPace} min/km</li>
                    </ul>
                    <label className="checkboxLabel">
                        <input type="checkbox" checked={this.props.bag ? true : false} /> Bag Drop Available
                     </label>
                    <div className="card-block text-center">
                        <button className="btn btn-secondary"><Link to={`/details/${this.props.event_id}`}>Event Details</Link></button>
                    </div>
                </div>
            </div>

        )
    }
}
export default OneEvent;