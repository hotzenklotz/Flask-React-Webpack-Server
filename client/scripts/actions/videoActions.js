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

export default alt.createActions(VideoActions)