import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { Segment, Container } from 'semantic-ui-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { appBaseUrl, urlProfile } from '../urls'

import { AppHeader, AppFooter, AppMain, getTheme } from 'formula_one'
import Profile from './Profile/profile'
import Search from './Search/search'
import main from 'formula_one/src/css/app.css'
import blocks from '../css/app.css'

class App extends Component {
  render() {
    const creators = [
      {
        name: "Anshul Dutt Sharma",
        role: "Full Stack Developer",
        link: 'https://internet.channeli.in/maintainer_site/team/Anshul/',      },

      {
        name: 'Pushpam Choudhary',
        role: 'Frontend developer',
      }
    ]

    return (
      <div styleName='main.app'>
        <AppHeader appName='people_search' mode='app' />
        <AppMain styleName='blocks.main'>
          <div styleName='main.app-main'>
            <Scrollbars autoHide>
              <Switch>
                <Route
                  exact
                  path="/people_search"
                  component={Search}
                />
                <Route
                  exact
                  path="/people_search/profile/"
                  component={Profile}
                />
                <Route render={props => <Redirect to='/404' />} />
              </Switch>


            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}

export default connect(
  null,
  null
)(App)
