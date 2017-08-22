import React from 'react';
import * as HallenService from "../service/HallService";
import Hall from '../layouts/HallView';
import * as Utils from '../service/Utils';

class HallContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallInfo: {},
            apparaten: [],
            style: {},
        }
    }

    componentDidMount()
    {
        HallenService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                this.setState({hallInfo: hal});
                return hal;
            })
            .then((hal) => {
                this.setStyle(hal);
                return hal;
            })
            .then((hal) => this.setApparaten(hal))
            .then(() => this.setImgSrc());
    }

    setStyle(hal)
    {
        let width = hal.width.split("px")[0] * 2;
        let height = hal.height.split("px")[0] * 2;
        let style = {
            width: width,
            height: height,
            border: "1px solid black",
            position: "relative",
            margin: "0 auto",
            textAlign: "center"
        };
        this.setState({style: style});
    }

    setApparaten(hal)
    {
        hal.apparaten.forEach((apparaat) =>
        {
            this.setState((prevState, props) => {this.state.apparaten.push(apparaat)});
        });
    }

    setImgSrc()
    {
        this.setState((prevState, props) =>
            this.state.apparaten.map((apparaat, i) => {
                if (apparaat.categorie === 'machine' && !Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/conveyor.png";
                    return apparaat;
                }
                else if (apparaat.categorie === 'machine' && Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/conveyor-red.png";
                    return apparaat;
                }
                else if (apparaat.categorie === 'lamp' && !Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/small-light-bulb.png";
                    return apparaat;
                }
                else if (apparaat.categorie === 'lamp' && Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/small-light-bulb-red.png";
                    return apparaat;
                }
                else if (apparaat.categorie === 'band' && !Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/assembly-line.png";
                    return apparaat;
                }
                else if (apparaat.categorie === 'band' && Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    apparaat.imageSrc = "../../assets/icons/assembly-line-red.png";
                    return apparaat;
                }
                return apparaat;
            })
        );
    }

    render()
    {
        return(
          <Hall {...this.state}/>
        );
    }
}

export default HallContainer;
