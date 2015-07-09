import React from "react";
import connectToStores from "alt/utils/connectToStores";
import LineChart from "../components/linechart.jsx";
import BarChart from "../components/barchart.jsx";
import Component from "../components/baseComponent.jsx";
import ResultStore from "../stores/resultStore"

class Result extends Component {

  static getStores() {
    return [ResultStore];
  }

  static getPropsFromStores() {
    return ResultStore.getState();
  }

  onDataClicked(datum) {

    const video = this.props.video

    // Calculate video timepoint from frame number (datum.x)
    const timepoint = datum.x / video.framerate
    this.refs.video.getDOMNode().currentTime = timepoint;
  }

  getBarChartData() {

    const groupedPredictions = ResultStore.getGroupedPredictions();
    const columns = _.chain(groupedPredictions)
      .map((value, key) => {
        const average = _.sum(value) / value.length;
        return [key, average];
      })
      .sortBy(column => column[1])
      .reverse()
      .slice(0, 5)
      .value();

    return {
      columns : columns
    }

  }

  getLineChartData() {

    const frameNumbers = ["frameNumber"].concat(ResultStore.getFrameNumbers());
    const groupedPredictions = ResultStore.getGroupedPredictions();
    let columns = _.map(groupedPredictions, (value, key) => [key].concat(value));
    columns.push(frameNumbers);

    return {
      x : "frameNumber",
      columns : columns
    }
  }

  onVideoHover(evt) {

    const videoElement = this.refs.video.getDOMNode();

    if(evt.type === "mouseenter") {
      videoElement.setAttribute("controls", null);
    } else if(evt.type === "mouseleave") {
      videoElement.removeAttribute("controls");
    }
  }

  render() {

    return (
      <div className="result-page">
        <div className="row">
          <div className="col s12 m6">
            <div className="card-panel teal video-panel valign-wrapper">
              <video
                ref="video"
                src={this.props.video.url}
                className="responsive-video valign"
                onMouseEnter={this.onVideoHover.bind(this)}
                onMouseLeave={this.onVideoHover.bind(this)}
                loop
                />
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card-panel center-align prediction-panel">
              <BarChart data={this.getBarChartData()} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
              <h3 className="card-title">Top 5 Predictated Labels per Frame</h3>
              <LineChart data={this.getLineChartData()} onDataClick={this.onDataClicked.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default connectToStores(Result);

