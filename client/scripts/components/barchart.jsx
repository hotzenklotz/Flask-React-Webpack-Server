import React from "react";
import _ from "lodash";
import C3 from "c3";
import C3CSS from "c3-css";
import Component from "./baseComponent.jsx";

class BarChart extends Component {

  componentDidMount() {
    this.generateChart();
  }
  componentDidUpdate() {
    this.generateChart();
  }

  generateChart() {

    _.extend(this.props.data, {
      onclick : this.props.onDataClick,
      type : "bar",
      tooltip : {
        show : false
      },
      labels : {
        format : (value) => value.toFixed(2)
      },

    })

    const chart = C3.generate({
      bindto : this.refs.chart.getDOMNode(),
      data : this.props.data,
      interaction : {
        enabled : false
      },
      size : {
        height : 290
      },
      axis: {
        x: {
          show : false
        }
      },
      color: {
        pattern: ["#2196F3", "#4dd0e1", "#e57373 ", "#4db6ac",  "#fff176", "#7986cb",]
      },
      legend : {
        position : "bottom"
      }
    });

  }

  render() {
    return <div ref="chart"/>;
  }

};

BarChart.propTypes = {
  data : React.PropTypes.object.isRequired,
  onDataClick : React.PropTypes.func
}

BarChart.defaultProps = {
  onDataClick : _.noop
}

export default BarChart;
