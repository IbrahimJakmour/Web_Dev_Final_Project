import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import OneEvent from './OneEvent';
import DatePicker from 'material-ui/DatePicker';

class Calendar extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            events: [],
            controlledDate2: null,
            controlledDate2: null
        }
    }

handleClick(e) {
    event.preventDefault();

    axios.post('http://localhost:8080/events/create')
    		.then(response => {
			console.log("This is the response for the post.");
			console.log(response.data)
		})
		.catch(err => {
			console.log(err)
		})
    }
    
 handleChange = (event, date) => {
    this.setState({
      controlledDate: date
    });
  };

   txtFieldChange(e) {
    if (e.target.name === "minDate") {
      this.state.minDate = e.target.value;
    } else if(e.target.name === 'maxDate'){
      this.state.maxDate = e.target.value
    }
    this.setState({
        minDate: this.state.minDate,
        maxDate: this.state.maxDate
    });
   }

componentWillMount(){
		console.log("This will mount is firing.");
		axios.get('http://localhost:8080/events')
    		.then(response => {
        this.setState({ 
            events: response.data
        })
			console.log("This is the response for the get.");
			console.log(response);
		})  
		.catch(err => {
			console.log(err)
		})
	}

    render(){
        const responseArray = this.state.events
        const eventsArray = responseArray.map((event, i) => {
            return <OneEvent key={i} name={event.name} distance={event.distance} bag={event.bag}/>
        })
        return(
            <div className="container">
            <h1>Hello!</h1>
            <div className="search_bar">
         <div className="dateSearch">
            <DatePicker
              hintText="Enter Date"
              value={this.state.controlledDate1}
              onChange={this.handleChange}
              name="minDate"
            />
            <DatePicker
              hintText="Enter Date"
              value={this.state.controlledDate2}
              onChange={this.handleChange}
              name="maxDate"
            />
        </div>
            </div>
                <div>
                    <button type="button" className="btn btn-primary"><Link to="/createEvent">Create Event</Link></button>
                     <div className="card-group">
                    {eventsArray}
                    </div>
                </div>
            </div>
        )
    }
}
export default Calendar;