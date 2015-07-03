import alt from "../alt";

class VideoActions {
  constructor() {
    this.generateActions(
      "receivePrediction",
      "uploadVideo",
      "useExample"
    )
  }
}

module.exports = alt.createActions(VideoActions)