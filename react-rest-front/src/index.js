import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import App from './component/App';
import Login from './component/Login';
import Home from './component/Home';
import Register from './component/Register';
import Calendar from './component/Calendar';
import CreateEvent from './component/CreateEvent';
import OneEvent from './component/OneEvent';
import PrivatePage from'./component/PrivatePage';
import Confirmation from './component/Confirmation';
import EventDetails from './component/EventDetails';
import './style.css';


ReactDOM.render((
  <Router history={hashHistory} >
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='login' component={Login}/>
        <Route path='register' component={Register}/>
        <Route path='calendar' component={Calendar}/>
        <Route path='/createEvent' component={CreateEvent}/>
         <Route path="/private" component={PrivatePage} />
         <Route path="/oneEvent" component={OneEvent}/>
         <Route path="/confirmation" component={Confirmation}/>
         <Route path="/details/:event_id" component={EventDetails}/>
      </Route>
  </Router>
),
  document.getElementById('root')
);
