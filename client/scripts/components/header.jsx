import React from "react";
import { Link } from "react-router";
import connectToStores from "alt/utils/connectToStores";
import Component from "./baseComponent.jsx";
import Logo from "../../images/apple-touch-icon-72x72.png";
import ResultStore from "../stores/resultStore.js";


class Header extends Component {

  static getStores() {
    return [ResultStore];
  }

  static getPropsFromStores() {
    return ResultStore.getState();
  }

  getResultLink() {
    if (this.props.video)
      return (
        <li>
          <Link to="result">
            <i className="material-icons left">dashboard</i>
            Result
          </Link>
        </li>
      );
  }

  render() {

    const resultLink = this.getResultLink();

    return (
      <nav className="blue">
        <div className="nav-wrapper">
          <div className="col s12">
            <a href="/" className="brand-logo">
              <img src="../../dist/images/apple-touch-icon-72x72.png" width="48px" height="48px"/>
              UCF101 Video Classifier
            </a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="home"><i className="material-icons left">launch</i>Upload video</Link></li>
              {resultLink}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

};

export default connectToStores(Header);
