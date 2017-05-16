import React from 'react';
import { Link } from 'react-router';

class Confirmation extends React.Component {
    render() {
        return (
            <div className="container-fluid background_confirmation">
                <div className="row">
                <div className="col-md-4"></div>
                <div className="square col-md-4">
                <h1>You're Going!</h1>
                    <div className="card-block">
                        <p className="card-text">Small batch subway tile gastropub coloring book. VHS semiotics distillery, hammock tousled chillwave green juice tilde vape kickstarter copper mug gastropub mlkshk normcore. Ennui messenger bag fam etsy enamel pin vape. Taxidermy church-key VHS 90's umami. Tousled lumbersexual DIY green juice intelligentsia banjo. </p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-block">
                       <div className="form-group text-center">
                        <button className="btn btn-secondary"><Link to="/calendar">Back to Calendar</Link></button>
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