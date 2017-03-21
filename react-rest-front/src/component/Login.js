import React from 'react'; 
import {Link} from 'react-router';
import axios from 'axios';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {username:null,password:null,warning:'no-warning'};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    let self = this;
    e.preventDefault();
    axios
      .post('http://localhost:8080/login',this.state)
      .then((res) => {
        console.log(res);
            if(res.status === 200){
                localStorage.authToken = res.data.token;
                location.href ="http://localhost:3000/private";
                console.log(localStorage.authToken);
            }
        })
      .catch(()=>{
          self.setState({
            warning:''
          })
      })
  }

  txtFieldChange(e){
    if(e.target.name === "username"){this.state.username = e.target.value}
    else if(e.target.name === "password"){this.state.password = e.target.value}

    this.setState({
      username:this.state.username,
      password:this.state.password
    });
  }

  render() {

    return (
     <div id="auth" className="background_login container-fluid">
     <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 square">
        <h2>Log In</h2>
        <h3>Find a running partner</h3>        
        <p className={"alert alert-danger "+ this.state.warning}>Incorrect username or password</p>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary"><Link to="/calendar">Login</Link></button>
            <br/>
            <a href=""><Link to="/register">Sign Up</Link></a>
          </div>

        </form>
        </div>
        <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default Login;