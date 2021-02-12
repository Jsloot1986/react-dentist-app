import React, { Component } from "react";
import "./home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="title">Tandartspraktijk B.V.T.</h1>
                    <i className="fas fa-tooth"></i>
                </div>
                <div className="container">
                    <h3 className="sub-title">Hier werken de leukste tandartsen!</h3>
                    <i className="far fa-smile-wink"></i>
                    <p>Kies in het menu wat je wil doen? Voor vragen kun je altijd onze service desk bellen!</p>
                </div>
            </div>
        )
    }
}
