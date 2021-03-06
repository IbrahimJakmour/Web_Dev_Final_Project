import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container-fluid">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <p className="brand">Brand</p>
                            </div>
                            <div className="nav navbar-nav navbar-right">
                                <button type="button" className="btn btn-secondary login"><Link to="/login">Login</Link></button>
                                <button type="button" className="btn btn-secondary login"><Link to="/register">Register</Link></button>
                            </div>
                        </div>
                    </nav>
                    {React.cloneElement(this.props.children)};
            </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
