import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid background_confirmation" >
                <div className="row header">
                    <div className="tagline ">
                        <h1>Plan your next run</h1>
                    </div>
                </div>
                <div className="row benefits">
                <div className="col-md-4 align-center">
                <h3>Meet Great People</h3>
                <img src="../svg/people.svg" alt=""/>
                </div>
                <div className="col-md-4 align-center">
                <h3>Stay Active</h3>    
                </div>
                <div className="col-md-4 aligne-center">
                <h3>Discover New Places</h3>
                </div>
                </div>
            </div>
        )
    }
}

export default Home;