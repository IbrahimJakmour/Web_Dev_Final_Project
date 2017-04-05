import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class PrivatePage extends React.Component{
  constructor(){
    super();
    this.state = {data:null,loading:true, auth:false}
  }
 componentDidMount(){
    const self = this;
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        //Add token to request header
        axios
        .get('/privatedata',{headers:{'authorization':localStorage.authToken}})
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                self.setState({
                    loading:false,
                    auth:true,
                    data: res.data
                   
                }); 
            }
        }).catch((err) => {
            //send user back to login page if token is invalid
            console.log(err);
        }
        )}
    else{
        location.href = '/';
    }
  }
  render(){
    if (this.state.loading) {
      return <div>hi user</div>;
    }
    else {
      return (
        <div>
          <h1>Hello {this.state.data}</h1>
        </div>
        );
    }
  }
}

export default PrivatePage;