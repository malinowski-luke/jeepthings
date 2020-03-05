import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import About from './components/About/About'
import Dashboard from './components/Dashboard/Dashboard'
import Post from './components/Post/Post'
import Profile from './components/Profile/Profile'

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/about' component={About} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/post' component={Post} />
    <Route path='/profile' component={Profile} />
  </Switch>
)
