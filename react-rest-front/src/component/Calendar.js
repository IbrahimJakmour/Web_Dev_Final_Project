import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import OneEvent from './OneEvent';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Calendar extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchDate = this.handleSearchDate.bind(this);
        this.handleSearchTime = this.handleSearchTime.bind(this);
        this.state = {
            events: [],
            controlledDate2: null,
            controlledDate2: null,
            value: 1,
            minDate: null,
            maxDate: null
        }
    }

    handleClick(e) {
        event.preventDefault();
        axios.post('http://localhost:8080/events/create')
            .then(response => {
                console.log("This is the response for the post.");
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

    handleSearchTime = (event, index, value) => this.setState({ value });

    handleSearchDate(e) {
        event.preventDefault();
        axios.post('http://localhost:8080/events/date', {
            minDate:this.state.minDate,
            maxDate:this.state.maxDate    
        })
            .then(response => {
                console.log('this is the response for the search date post request')
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleSearchTime(e) {
        event.preventDefault();
        axios.post('http://localhost:8080/events/time', this.state)
            .then(response => {
                console.log('this is the response for the search date post request')
            })
            .catch(err => {
                console.log(err)
            })
    };
    txtFieldChange(e) {
        if (e.target.name === "minDate") {
            this.state.minDate = e.target.value;
        } else if (e.target.name === 'maxDate') {
            this.state.maxDate = e.target.value
        }
        this.setState({
            minDate: this.state.minDate,
            maxDate: this.state.maxDate
        });
    }


    componentWillMount() {
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

    render() {
        const responseArray = this.state.events
        const eventsArray = responseArray.map((event, i) => {
            return <OneEvent key={i} name={event.name} distance={event.distance} bag={event.bag} />
        })
        return (
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
                        <button type="button" className="btn btn-primary" onClick={this.handleSearchDate}>Search</button>
                    </div>
                </div>
                <div className="searchTime">
                    <SelectField value={this.state.value} onChange={this.handleSearchTime}>
                        <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
                        <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
                        <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
                        <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
                    </SelectField>
                </div>
                <button type="button" className="btn btn-primary"><Link to="/createEvent">Create Event</Link></button>
                <div className="card-group">
                    {eventsArray}
                </div>
            </div>
        )
    }
}
export default Calendar;