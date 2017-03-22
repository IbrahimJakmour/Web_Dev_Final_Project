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
        this.handleChangeDateMax = this.handleChangeDateMax.bind(this);
        this.handleChangeDateMin = this.handleChangeDateMin.bind(this);
        this.handleSearchDate = this.handleSearchDate.bind(this);
        this.handleSearchTime = this.handleSearchTime.bind(this);
        this.state = {
            events: [],
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

    handleChangeDateMin = (event, date) => {
        this.setState({
            minDate: date,
        });
    };
    handleChangeDateMax = (event, date) => {
        this.setState({
            maxDate: date,
        });
    };
    handleSearchTime = (event, index, value) => this.setState({ value });

    handleSearchDate(e) {
        event.preventDefault();

        const config = {
            params: {
                minDate: this.state.minDate,
                maxDate: this.state.maxDate
            }
        }
// other option: var url = 'http://localhost:8080/events/date' + '?minDate=' + minDate.toString() + '&' + 'maxDate=' + maxDate.toString()

        axios.get('http://localhost:8080/events/date', config)
            .then(response => {
                console.log('this is the response for the search date post request')
                this.setState({
                    events: response.data
                })
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
            return <OneEvent key={i} name={event.name} distance={event.distance} bag={event.bag} event_id={event._id}/>
        })
        return (
            <div className="container">
                <h1>Hello!</h1>
                <div className="search_bar">
                    <div className="dateSearch">
                        <DatePicker
                            hintText="Enter Date"
                            value={this.state.minDate}
                            onChange={this.handleChangeDateMin}
                            name="minDate"
                        />
                        <DatePicker
                            hintText="Enter Date"
                            value={this.state.maxDate}
                            onChange={this.handleChangeDateMax}
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
                <div className="row">
               
                    {eventsArray}
               
                </div>
            </div>
        )
    }
}
export default Calendar;