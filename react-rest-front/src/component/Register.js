import React from 'react'; 
import axios from 'axios';
import {Link} from 'react-router';
import {TextField} from 'material-ui';




class Register extends React.Component {
  constructor(){
    super();
    this.state = {username:null,password:null};
    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    e.preventDefault();
    axios
      .post('http://localhost:8080/users',this.state)
      .then( (res) =>{
        console.log(res);
      })
  }

  txtFieldChange(e){
    if(e.target.name === "firstName"){
        this.state.firstName = e.target.value;
    }
    else if(e.target.name === 'lastName') {
        this.state.lastName = e.target.value;
    }
    else if(e.target.name === 'username'){
      this.state.username = e.target.value;
    }
    else if(e.target.name === 'blog'){
      this.state.blog = e.target.value;
    }
    else if(e.target.name === 'email'){
      this.state.email = e.target.value;
    }
    else if(e.target.name === "password"){
        this.state.password = e.target.value;
    }
    this.setState({
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      username:this.state.username,
      blog:this.state.blog,
      email:this.state.email,
      password:this.state.password
    });
  }

  render() {
    
    return (
      
      <div id="register" className="background_login container-fluid">
        <div className="row">
         <div className="col-md-4"></div>
        <div className="col-md-4 square">
        <h2>Create Your Account</h2>
        <h3>Join the Community</h3>
        <form onSubmit={this.formSubmit}>
         <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="First Name" 
              name="firstName" />
          </div>
           <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Last Name" 
              name="lastName" />
          </div>
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
              type="text" 
              placeholder="Facebook link" 
              name="fb_link" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Instagram link" 
              name="ig_link" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Strava link" 
              name="strava_link" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="blog link" 
              name="blog" />
          </div>
           <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="email" 
              name="email" />
          </div>
           <div className="checkbox">
                <label>
                  <input
                    onChange={this.checkBox}
                    className="checkbox"
                    type="checkbox" />Men
                </label>
              </div>
               <div className="checkbox">
                <label>
                  <input
                    onChange={this.checkBox}
                    className="checkbox"
                    type="checkbox" />Women
                </label>
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
            <button className="btn btn-primary"><Link to="/confirmation">Create Account</Link></button>
          </div>
        </form>
        </div>
        <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default Register;
