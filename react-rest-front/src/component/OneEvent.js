import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class OneEvent extends React.Component {
    render() {
        return (
            <div className="card" style={{ width: 20 + 'rem' }}>
                <div className="card-block">
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="card-text">{this.props.comment}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Date: March 24</li>
                    <li className="list-group-item">Time: 8pm</li>
                    <li className="list-group-item">Distance:{this.props.distance}</li>
                    <li className="list-group-item">Pace: {this.props.minPace} to {this.props.maxPace}</li>
                    <li></li>
                </ul>
                <label>
                    <input type="checkbox" checked={this.props.bag ? true : false}/> Bag Drop Available
                 </label>
                    <div className="card-block">
                        <button><Link to="/oneEvent">Event Details</Link></button>
                        <a href={this.props.route} className="card-link">Route link</a>
                    </div>                   
                </div>
                )
    }
}
export default OneEvent;