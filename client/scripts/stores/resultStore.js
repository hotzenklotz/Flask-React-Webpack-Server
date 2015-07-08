import _ from "lodash"
import alt from "../alt";
import VideoActions from "../actions/videoActions";
import RouterActions from "../actions/routerActions";

class ResultStore {

  constructor() {
    this.bindActions(VideoActions);
    this.predictions = []
  }

  onReceivePrediction(prediction) {
    debugger;
    this.predictions.push(prediction);

    // RouterActions.transition("info")

  }

};

export default alt.createStore(ResultStore, "ResultStore");