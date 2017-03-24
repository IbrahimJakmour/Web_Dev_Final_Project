import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TimePicker from 'material-ui/TimePicker';


class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      bag: false,
      controlledDate: null,
      time: null,
      date_time: null,
      name: null,
      location_start: null,

    };
    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date
    });
    console.log(date)
  };

  handleChangeTimePicker24 = (event, date) => {
    this.setState({ 
      time: date 
    });
  };

 

  formSubmit(e) {

    const d = this.state.controlledDate
    const t = this.state.time
    const concatDate =  d.toISOString().substr(0,10)
    const concatTime = t.toISOString().substr(11,12)  
    const storedDate = concatDate + 'T' + concatTime +'Z'

    console.log(storedDate)
    
    let temp = this.state
    temp.date_time = storedDate
    temp.just_date = concatDate
    const object = JSON.parse(localStorage.user)
    console.log(object);
    temp.username = object.username
    temp.created_by = object._id

    e.preventDefault();
    axios
      .post('http://localhost:8080/events', temp)
      .then((res) => {
        location.href('/calendar');
        console.log(res);
      })

    this.setState({
       date_time: storedDate,
    })
  }


  checkBox(e) {
    if (e.target.checked) {
      this.state.bag = true;
    } else {
      this.state.bag = false;
    }
    this.setState({
      bag: this.state.bag
    })
  }

  txtFieldChange(e) {
    if (e.target.name === "name") {
      this.state.name = e.target.value;
    }
    else if (e.target.name === 'dayOfWeek') {
      this.state.dayOfWeek = e.target.value;
    }
    else if(e.target.name === 'timeOfDay'){
      this.state.timeOfDay = e.target.value;
    }
    else if (e.target.name === 'location_start') {
      this.state.location_start = e.target.value;
    }
    else if (e.target.name === 'minPace') {
      this.state.minPace = e.target.value;
    }
    else if (e.target.name === 'maxPace') {
      this.state.maxPace = e.target.value;
    }
    else if (e.target.name === "distance") {
      this.state.distance = e.target.value;
    }
    else if (e.target.name === "comment") {
      this.state.comment = e.target.value;
    }
    else if (e.target.name === "route") {
      this.state.route = e.target.value;
    }
    this.setState({
      name: this.state.name,
      location_start: this.state.location_start,
      minPace: this.state.minPace,
      maxPace: this.state.maxPace,
      distance: this.state.distance,
      comment: this.state.comment,
      route: this.state.route
    });
  }

  componentDidUpdate() {
    console.log(this.state.date_time)
  }

  render() {
    return (
      <div className="container-fluid background_createEvent">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 square">
            <h3>Create An Event</h3>

            <DatePicker
              hintText="Enter Date"
              value={this.state.controlledDate}
              onChange={this.handleChange}
              name="dayOfWeek"
            />
              <TimePicker
                  format="24hr"
                  hintText="Enter Time"
                  value={this.state.time}
                  onChange={this.handleChangeTimePicker24}
                  name="timeOfDay"
                />
            <form onSubmit={this.formSubmit}>
              <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Name of Event"
                  name="name" />
              </div>
                <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Start Location"
                  name="location_start" />
              </div>
              <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Minimum Pace (min/km)"
                  name="minPace" />
              </div>
              <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Maximum Pace (min/km)"
                  name="maxPace" />
              </div>
              <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Distance (in km)"
                  name="distance" />
              </div>
              <div className="checkbox">
                <label>
                  <input
                    onChange={this.checkBox}
                    className="checkbox"
                    type="checkbox" />Bag Check
                </label>
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
                <textarea
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Additional Details"
                  name="comment" />
              </div>
              <div className="form-group">
                <input
                  onChange={this.txtFieldChange}
                  className="form-control"
                  type="text"
                  placeholder="Route Link"
                  name="route" />
              </div>
              <div className="form-group">
                <button className="btn btn-secondary">Create Event</button>
                <button className="btn btn-secondary"><Link to="/calendar">Back</Link></button>
              </div>
            </form>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;