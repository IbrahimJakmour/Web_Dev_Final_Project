import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid background_confirmation" >
                <div className="row header">
                    <div className="tagline">
                        <blockquote>
                        <h2 className="taglinePhrase">Building the running community, one run at a time</h2>
                        </blockquote>
                    </div>
                </div>
                <div className="row benefits">
                <div className="col-md-4 text-center categorie">
                <h3>Meet Great People</h3>
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                </div>
                <div className="col-md-4 text-center categorie">
                <h3>Stay Active</h3> 
                <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>   
                </div>
                <div className="col-md-4 text-center categorie">
                <h3>Discover New Places</h3>
                <span className="glyphicon glyphicon-road" aria-hidden="true"></span>   
                </div>
                </div>
            </div>
        )
    }
}

export default Home;