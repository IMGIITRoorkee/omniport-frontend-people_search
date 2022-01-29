import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./components/app";

export default class AppRouter extends Component {
  render() {
    const { match } = this.props;
    return (
      <Provider store={store}>
        <Route path={`${match.path}/`} component={App} />
      </Provider>
    );
  }
}
