import React from "react";
import connectToStores from "alt/utils/connectToStores";
import LineChart from "../components/linechart.jsx";
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
    console.log(datum);
  }

  render() {

    const frameNumbers = ["frameNumber"].concat(ResultStore.getFrameNumbers());
    const groupedPredictions = ResultStore.getGroupedPredictions();
    let columns = _.map(groupedPredictions, (value, key) => [key].concat(value));
    columns.push(frameNumbers);

    const data = {
      x : "frameNumber",
      columns : columns
    }
    debugger

    return (
      <div>
        <h2>Result</h2>
        <video src={this.props.video.url} controls/>
        <LineChart data={data} onDataClick={this.onDataClicked.bind(this)}/>
      </div>
    );
  }

};

export default connectToStores(Result);

