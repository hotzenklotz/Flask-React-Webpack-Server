import alt from "../alt";
import Router from "react-router"

class RouterActions {

  transition(nextPage) {

    Router.transitionTo("step", {stepUrl: nextPage});

    this.dispatch({
        actionType: RouterConstants.UPDATE_PAGE,
        nextPage: nextPage
    });
  }
}

module.exports = alt.createActions(RouterActions)