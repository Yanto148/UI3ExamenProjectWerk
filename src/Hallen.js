import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import './App.css';
import * as HallenService from "./service/HallService";

class Hallen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallenSet: [],
            styles: []
        }
    }

    componentDidMount()
    {
        HallenService.getHallenFromBackend()
            .then(hallen => {this.setState({hallenSet: hallen})})
            .then(() => this.setStyles(this.state.hallenSet));
    }

    setStyles(hallen)
    {
        hallen.forEach((hal) => {
            let style = {
                left: hal.x,
                top: hal.y,
                width: hal.width,
                height: hal.height,
                border: "1px solid black",
                position: "absolute"
            };
            this.setState((prevState, props) => {this.state.styles.push(style)})
        });
    }

    render() {

        var containerStyle = {
            position: "relative",
            width: "1000px",
            margin: "20px auto"
        };

        return (
            <div className="App" style={containerStyle}>
                {this.state.hallenSet.map((hal, i) =>
                    <div key={i} style={this.state.styles[i]}>{hal.name}</div>
                )}
            </div>
        );
    }
}

export default Hallen;