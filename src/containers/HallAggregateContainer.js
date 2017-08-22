import React from 'react';
import * as HallenService from "../service/HallService";
import Plattegrond from '../layouts/BlueprintView';
import Lijst from '../layouts/ListView';
import * as Utils from '../service/Utils';

class PlattegrondContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallenSet: [],
            styles: [],
            oppervlaktes: [],
            aantalApparaten: [],
            aantalActies: [],
            activePage: 'Plattegrond',
            containerStyle : {
                position: "relative",
                width: "1000px",
                margin: "20px auto"
            },
            buttonStyle: {
                textAlign: "center"
            },
            alarm: false,
        }
    }

    componentDidMount()
    {
        HallenService.getHallenFromBackend()
            .then(hallen => {this.setState({hallenSet: hallen})})
            .then(() => this.setStyles(this.state.hallenSet))
            .then(() => this.setOppervlaktes(this.state.hallenSet))
            .then(() => this.setAantalApparaten(this.state.hallenSet))
            .then(() => this.setAantalActies(this.state.hallenSet));
    }

    setOppervlaktes(hallen)
    {
        hallen.forEach((hal) => {
            let width = hal.width.split("px");
            let height = hal.height.split("px");
            let oppervlakte = (width[0] * height[0]) / 100;
            this.setState((prevSate, props) => {this.state.oppervlaktes.push(oppervlakte)});
        });
    }

    setAantalApparaten(hallen)
    {
        hallen.forEach((hal) => {
            let aantalApparaten = hal.apparaten.length;
            this.setState((prevSatet, props) => this.state.aantalApparaten.push(aantalApparaten));
        });
    }

    setAantalActies(hallen)
    {
        let aantal = 0;
        hallen.forEach((hal) => {
            aantal = 0;
            hal.apparaten.forEach((apparaat) => {
                if (Utils.checkIfNextActionIn24Hours(apparaat))
                {
                    aantal++;
                }
            });
            this.setState((prevSate, props) => {this.state.aantalActies.push(aantal)});
        });
    }

    setStyles(hallen)
    {
        // TODO remove style array, lift into state.
        console.log(this.state.alarm);
        console.log('Setting styles');
        let styles = [];
        this.setState({styles: styles});
        console.log('before loop');
        console.log(this.state);
        hallen.forEach((hal) => {
            let backgroundColor;
            if (this.state.alarm)
                backgroundColor = 'red';
            else
                backgroundColor = 'white';

            let style = {
                left: hal.x,
                top: hal.y,
                width: hal.width,
                height: hal.height,
                border: "1px solid black",
                position: "absolute",
                textAlign: "center",
                backgroundColor: backgroundColor
            };
            this.setState((prevState, props) => {this.state.styles.push(style)});
        });
        console.log('after loop');
        console.log(this.state);
    }

    switchLayout()
    {
        if (this.state.activePage === 'Plattegrond')
        {
            this.setState({activePage : 'Lijst'});
        }
        else if (this.state.activePage === 'Lijst')
        {
            this.setState({activePage : 'Plattegrond'});
        }
    }

    slaAlarm(event)
    {
        event.preventDefault();
        if (this.state.alarm === true)
        {
            this.setState({alarm: false});
        }
        else if (this.state.alarm === false)
        {
            this.setState({alarm: true})
        }
        this.setStyles(this.state.hallenSet);
    }

    render() {
        let partial;
        if(this.state.activePage === 'Plattegrond')
        {
            partial = <Plattegrond {...this.state} switchLayout={() => this.switchLayout()} slaAlarm={(e) => this.slaAlarm(e)}/>;
        }
        else if (this.state.activePage === 'Lijst')
        {
            partial = <Lijst {...this.state} switchLayout={() => this.switchLayout()} slaAlarm={(e) => this.slaAlarm(e)}/>;
        }

        return (
            <div>
                {partial}
            </div>
        );
    }
}

export default PlattegrondContainer;