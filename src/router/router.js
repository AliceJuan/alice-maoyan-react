import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'

import msite from '../components/msite/msite'
//import film from '../components/film/film'
// import cinema from '../components/cinema/cinema'
//import cinemaDetail from '../components/cinemaDetail/cinemaDetail'
import user from '../components/user/user'
import search from '../components/search/search'
//import chooseSeat from '../components/chooseSeat/chooseSeat'
//import city from '../components/city/city'
// import orderConfirm from '../components/orderConfirm/orderConfirm'
import login from '../components/login/login'

import city from '../container/City'
import film from '../container/Film'
import cinema from '../container/Cinema'
import cinemaDetail from '../container/CinemaDetail'
import chooseSeat from '../container/ChooseSeat'
import orderConfirm from '../container/OrderConfirm'

export default class RouteConfig extends Component {
    render () {
      return (
        <HashRouter>
          <Switch>
            <Route path="/msite" component={msite}/>
            <Route path="/film/:filmId" component={film}/>
            <Route path="/cinema" component={cinema}/>
            <Route path="/cinemaDetail" component={cinemaDetail}/>
            <Route path="/user" component={user}/>
            <Route path="/search" component={search}/>
            <Route path="/chooseSeat" component={chooseSeat}/>
            <Route path="/city" component={city}/>
            <Route path="/orderConfirm" component={orderConfirm}/>
            <Route path="/login" component={login}/>
            <Redirect exact from='/' to='/msite'/>
            {/* <Route path="/food/:geohash/:id/:title"  component= {food}/>
            <Route path="/technology"  component= {technology}/>
            <Redirect exact from='/' to='/profile'/>
            <Route component= {profile}/> */}
          </Switch>
        </HashRouter>
      )
    }
  }