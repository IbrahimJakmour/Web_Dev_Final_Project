import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import OneEvent from './OneEvent';
import EventDetails from './EventDetails'
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
        this.handleSearchByDayTime = this.handleSearchByDayTime.bind(this);
        this.state = {
            events: [],
            value: '',
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
        axios.get('/events/date', config)
            .then(response => {
                console.log('this is the response for the search get date request')
                this.setState({
                    events: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleSearchByDayTime(e) {
        e.preventDefault();

        const config = {
            params: {
                day_period: this.state.value
            }
        }
        console.log(config)
        axios.get('/events/time', config)
            .then(response => {
                console.log('1 step further')
                this.setState({
                    events: response.data
                })
            })
            .catch(err => {
                console.log(err)
                console.log('here')
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
        axios.get('/events')
            .then(response => {
                this.setState({
                    events: response.data
                })
            })
            .catch(err => {
            })
    }

    render() {
        const responseArray = this.state.events
        const eventsArray = responseArray.map((event, i) => {
            return <OneEvent key={i} name={event.name} distance={event.distance} date_time={event.date_time} comment={event.comment} minPace={event.minPace} maxPace={event.maxPace} location_start={event.location_start} day_period={event.day_period} just_date={event.just_date} bag={event.bag} event_id={event._id} id={event._id}/>
        })

        return (
            <div className="container-fluid">
                <h1>Run Calendar: Find A Run</h1>
                <div className="searchbar">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <h2>Search by Date</h2>

                        <DatePicker
                            hintText="From Date"
                            value={this.state.minDate}
                            onChange={this.handleChangeDateMin}
                            name="minDate"
                        />

                        <DatePicker
                            hintText="To Date"
                            value={this.state.maxDate}
                            onChange={this.handleChangeDateMax}
                            name="maxDate"
                        />
                        <button type="button" className="btn btn-secondary searchDate" onClick={this.handleSearchDate}>Search</button>
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Search by Time</h2>
                        <SelectField value={this.state.value} onChange={this.handleSearchTime} name="day_period" hintText="Day Period">
                            <MenuItem value={'morning'} label="5 am - 12 pm" primaryText="Morning" />
                            <MenuItem value={'afternoon'} label="12 pm - 5 pm" primaryText="Afternoon" />
                            <MenuItem value={'evening'} label="5 pm - 9 pm" primaryText="Evening" />
                            <MenuItem value={'night'} label="9 pm - 5 am" primaryText="Night" />
                        </SelectField>
                        <br/>
                        <button type="button" className="btn btn-secondary searchTime" onClick={this.handleSearchByDayTime}>Search</button>

                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Create Your Event</h2>
                        <button type="button" className="btn btn-secondary createEvent"><Link to="/createEvent">Create Event</Link></button>
                    </div>
                </div>
                    <div className="container-fluid">
                        {eventsArray}
                    </div>
                </div>
            </div>
        )
    }
}
export default Calendar;