import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import About from './components/About/About'
import Dashboard from './components/Dashboard/Dashboard'
import Post from './components/Post/Post'
import Profile from './components/Profile/Profile'
import Form from './components/Form/Form'
import Item from './components/Item/Item'

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/about' component={About} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/post' component={Post} />
    <Route path='/profile' component={Profile} />
    <Route path='/form' component={Form} />
    <Route path='/item/:post_id' component={Item} />
  </Switch>
)
