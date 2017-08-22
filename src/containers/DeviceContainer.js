import React from 'react';
import * as HallService from '../service/HallService';
import DeviceView from '../layouts/DeviceView';

class DeviceContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            categorie: '',
            naam: '',
            omschrijving: '',
            laatstUitgevoerdeActieDatum: '',
            laatstUitgevoerdeActieType: '',
            laatstUitgevoerdeActieOmschrijving: '',
            eerstVolgendeActieDatum: '',
            eerstVolgendeActieType: '',
            eerstVolgendeActieOmschrijving: '',
            formValid: true,
            naamMsg: '',
            datumMsgLaatsteActie: '',
            datumMsgEersteActie: '',
            typeMsgLaatsteActie: '',
            typeMsgEersteActie: ''
        };
    }

    componentDidMount()
    {
        HallService.getHallFromBackend(this.props.params.hallId)
            .then((hal) => {
                hal.apparaten.forEach((apparaat) => {
                    if (apparaat.id == this.props.params.deviceId)
                    {
                        this.setState({id: apparaat.id});
                        this.setState({categorie: apparaat.categorie});
                        this.setState({naam: apparaat.naam});
                        this.setState({omschrijving: apparaat.omschrijving});
                        this.setState({laatstUitgevoerdeActieDatum: apparaat.laatstUitgevoerdeActie.datum});
                        this.setState({laatstUitgevoerdeActieType: apparaat.laatstUitgevoerdeActie.type});
                        this.setState({laatstUitgevoerdeActieOmschrijving: apparaat.laatstUitgevoerdeActie.omschrijving});
                        this.setState({eerstVolgendeActieDatum: apparaat.eerstVolgendeActie.datum});
                        this.setState({eerstVolgendeActieType: apparaat.eerstVolgendeActie.type});
                        this.setState({eerstVolgendeActieOmschrijving: apparaat.eerstVolgendeActie.omschrijving});
                    }
                }) ;
            });
    }

    actionCompleted(event)
    {
        event.preventDefault();
        const eerstVolgendeActieDatum = this.state.eerstVolgendeActieDatum;
        const eerstVolgendeActieType = this.state.eerstVolgendeActieType;
        const eerstVolgendeActieOmschrijving = this.state.eerstVolgendeActieOmschrijving;
        this.setState({laatstUitgevoerdeActieDatum : eerstVolgendeActieDatum});
        this.setState({laatstUitgevoerdeActieType : eerstVolgendeActieType});
        this.setState({laatstUitgevoerdeActieOmschrijving : eerstVolgendeActieOmschrijving});
    }

    handleChange(event)
    {
        this.setState({[event.target.name] : event.target.value});
    }

    validateForm(event)
    {
        if (this.state.naam.length > 100 || this.state.naam === '')
        {
            this.setState({naamMsg: 'Verplicht veld, mag niet meer dan 100 karakters bevatten'});
            this.setState({formValid: false});
        }

        //TODO / should be mandotory
        let regexp = new RegExp("^[0-9]?[0-9][/][0-9]?[0-9][/][0-9][0-9][0-9][0-9]$");
        if (!regexp.test(this.state.laatstUitgevoerdeActieDatum))
        {
            this.setState({datumMsgLaatsteActie: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }
        if (!regexp.test(this.state.eerstVolgendeActieDatum))
        {
            this.setState({datumMsgEersteActie: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }

        if (this.state.formValid)
        {
            this.clearErrorMessages();
            this.handleSubmit();
        }
    }

    clearErrorMessages()
    {
        this.setState({datumMsgLaatsteActie: ''});
        this.setState({datumMsgEersteActie: ''});
        this.setState({typeMsgLaatsteActie: ''});
        this.setState({typeMsgEersteActie: ''});
    }

    handleSubmit()
    {
        const payload = {
            id: this.state.id,
            categorie: this.state.categorie,
            naam: this.state.naam,
            omschrijving: this.state.omschrijving,
            laatstUitgevoerdeActie: {
                datum: this.state.laatstUitgevoerdeActieDatum,
                type: this.state.laatstUitgevoerdeActieType,
                omschrijving: this.state.laatstUitgevoerdeActieOmschrijving
            },
            eerstVolgendeActie: {
                datum: this.state.eerstVolgendeActieDatum,
                type: this.state.eerstVolgendeActieType,
                omschrijving: this.state.eerstVolgendeActieOmschrijving
            }
        };

        const url = 'http://localhost:4200/hal/' + this.props.params.hallId + '/apparaat/' + this.state.id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(() => this.props.router.push('/hall/' + this.props.params.hallId))
            .catch((err) => console.log(err));
    }

    render()
    {
        return <DeviceView
            {...this.state}
            actionCompleted={(e) => this.actionCompleted(e)}
            handleChange={(e) => this.handleChange(e)}
            validateForm = {(e) => this.validateForm(e)}
        />
    }
}

export default DeviceContainer;