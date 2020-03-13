import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import About from './components/About/About'
import Posts from './components/Posts/Posts'
import Profile from './components/Profile/Profile'
import Form from './components/Form/Form'
import Post from './components/Post/Post'

export default (
  <Switch>
    <Route exact path='/' component={About} />
    <Route path='/login' component={Auth} />
    <Route path='/posts' component={Posts} />
    <Route path='/profile' component={Profile} />
    <Route exact path='/form' component={Form} />
    <Route path='/form/:post_id' component={Form} />
    <Route path='/post/:post_id' component={Post} />
  </Switch>
)
