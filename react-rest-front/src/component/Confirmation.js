import React from 'react';
import { Link } from 'react-router';

class Confirmation extends React.Component {
    render() {
        return (
            <div className="container-fluid background_confirmation">
                <div className="row">
                <div className="col-md-4"></div>
                <div className="card col-md-4">
                    <img className="card-img-top" src="..." alt="Card image cap" />
                    <div className="card-block">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-block">
                       <div className="form-group text-center">
                        <button className="btn btn-primary"><Link to="/calendar">Back to Calendar</Link></button>
                    </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
                </div>
            </div>

        )
    }
}
export default Confirmation;