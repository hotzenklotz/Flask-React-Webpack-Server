import React from "react";
import _ from "lodash";
import C3 from "c3";
import C3CSS from "c3-css";
import Component from "./baseComponent.jsx";

class LineChart extends Component {

  componentDidMount() {
    this.generateChart();
  }
  componentDidUpdate() {
    this.generateChart();
  }

  generateChart() {

    _.extend(this.props.data, {
      selection : {
        enabled : true,
        multiple : false
      },
      onclick : this.props.onDataClick
    })

    const chart = C3.generate({
      bindto : this.refs.chart.getDOMNode(),
      data : this.props.data,
      color: {
        pattern: ["#2196F3", "#4dd0e1", "#e57373 ", "#4db6ac",  "#fff176", "#7986cb",]
      },
      tooltip: {
        format : {
          title: (x) => "Frame #" + x
        }
      },
      axis : {
        x : {
          label : "Frame Number"
        }
      }
    });

  }

  render() {
    return <div ref="chart"/>;
  }

};

LineChart.propTypes = {
  data : React.PropTypes.object.isRequired,
  onDataClick : React.PropTypes.func
}

LineChart.defaultProps = {
  onDataClick : _.noop
}

export default LineChart;
