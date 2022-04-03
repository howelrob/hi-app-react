import React, { Component } from 'react';
import { PDFDocument,  StandardFonts, rgb } from 'pdf-lib';

// to run, do 'cd hi-app-react', then 'npm start' in the powershell (Win + X)
// https://www.trec.texas.gov/sites/default/files/pdf-forms/REI_7-5.pdf

class HIApp extends Component {
    state = { 
        sections: ['Home', 'Saved Projects', 'New Projects', 'Account'],
        inspOptions: ['Inspected', 'Not Inspected', 'Not Present', 'Deficient'],
        
        structuralSystems: ['Foundations', 'Grading/Drainage', 'Roof Covering Materials', 
        'Roof Structures/Attics', 'Walls (Interior/Exterior)', 'Ceilings/Floors', 'Doors (Interior/Exterior)',
        'Windows', 'Stairways (Interior/Exterior)', 'Fireplaces/Chimneys', 'Porches, Balconies, Decks, and Carports', 'Other'],

        electricalSystems: ['Service Entrance/Panels', 'Branch Circuits, Connected Devices, and Fixtures'],

        heatVentAirSystems: ['Heating Equipment', 'Cooling Equipment', 'Duct Systems, Chases, and Vents'],

        plumbingSystems: ['Plumbing Supply, Distribution Systems and Fixtures', 'Drains, Wastes, and Vents',
        'Water Heating Equipment', 'Hydro-Massage Therapy Equipment', 'Other'],

        appliances: ['Dishwashers', 'Food Waste Disposers', 'Range Hood/Exhaust Systems',
        'Ranges, Cooktops, and Ovens', 'Microwave Ovens', 'Mechanical Exhaust Vents/Bathroom Heaters',
        'Garage Door Operators', 'Dryer Exhaust Systems', 'Other'],

        optionalSystems: ['Landscape Irrigation (Sprinkler) Systems', 'Swimming Pools, Spas, Hot Tubs, and Equipment',
        'Outbuildings', 'Private Water Wells', 'Private Sewage Disposal (Septic) Systems', 'Other'],

        homeBodyState: 'block',
        savedProjectBodyState: 'd-none',

        structuralSystemsState: 'd-none',
        electricalSystemsState: 'd-none',
        heatVentAirSystemsState: 'd-none',
        plumbingSystemsState: 'd-none',
        appliancesState: 'd-none',
        optionalSystemsState: 'd-none',

        newProjectButtonState: 'block',
        newProjectPromptState: 'd-none',
        newProjectReportBodyState: 'd-none',
        newProjectBodyState: 'd-none',

        reportBodyState: 'd-none',

        accountBodyState: 'd-none',

        newProjectName: 'Unnamed',

        pdfUrl: 'https://www.trec.texas.gov/sites/default/files/pdf-forms/REI_7-5.pdf',
        //pdfForm: this.pdfUrl.getForm()
    };


    //Styles
    pageStyle = {
        backgroundColor: 'blanchedalmond',
    };

    titleStyle = {
        fontSize: 40,
        fontWeight: 'bold',
        backgroundColor: 'blanchedalmond',
        textAlign: 'center',
        padding: 10,
        width: '100%'
    };

    sidebarLayoutStyle = {
        listStyleType: 'none',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    };

    sidebarItemStyle = {
        paddingTop: 5,
        paddingBottom: 5,
        width: '100%'
    };

    bodyStyle = {
        backgroundColor: 'navajowhite',
    };

    sidebarStyle = {
        backgroundColor: 'floralwhite',
    };

    homeBodyStyle = {
        fontSize: 40,
        textAlign: 'center',
    };

    savedProjectBodyStyle = {
        fontSize: 40,
        textAlign: 'center'
    };

    newProjectButtonStyle = {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 35
    };

    newProjectPromptStyle = {
        fontWeight: 'bold',
        backgroundColor: 'floralwhite',
        margin: 'auto',
        marginTop: 25,
        width: 250,
        padding: 5
    };

    newProjectPromptFormStyle = {
        margin: 'auto',
        padding: 'auto'
    };

    reportBodyHeaderStyle = {
        backgroundColor: 'floralwhite',
        fontSize: 10,
        paddingLeft: 7,
    };

    reportBodyStyle = {
        backgroundColor: 'floralwhite',
        margin: 'auto',
        paddingTop: 10,
        paddingLeft: 10,
        marginBottom: 5
    };

    inspCategoryStyle = {
        fontSize: 18,
        margin: 3,
        backgroundColor: 'white',
        paddingLeft: 11,
        paddingTop: 5,
        width: 650
    };

    innerCategoryStyle = {
        fontSize: 15,
        paddingRight: 4,
        paddingBottom: 9
    };

    accountBodyStyle = {
        fontSize: 40,
        textAlign: 'center'
    };


    //Renders
    renderTitleHeader() {
        return <h1 style={this.titleStyle}>Texas Home Inspection</h1>
    }

    renderSidebarList() {
        return <div style={this.sidebarLayoutStyle}>
            { this.state.sections.map(section => 
                <button key={section} onClick={() => this.clickSidebar(section)} 
                    style={this.sidebarItemStyle} className="border rounded border-dark">
                    <b>{section}</b><br /></button> ) }
            </div>
    }

    renderHomeBody() {
        return (<div style={this.homeBodyStyle}>
                <b>Home</b>
                <a href={this.state.pdfUrl} download>Pdf</a>
            </div>)
    }

    renderSavedProjectBody() {
        return (<div style={this.savedProjectBodyStyle}>
                <b>Saved Projects</b>
            </div>)
    }
    
    renderNewProjectButton() {
        return (<div className={this.state.newProjectButtonState} style={this.newProjectButtonStyle}>
                <button onClick={() => this.clickNewProjectButton()}><b>Start a New Project</b></button>
            </div>)
    }
    
    renderNewProjectPrompt() {
        return (<div className={this.state.newProjectPromptState + ' border border-dark rounded'} 
                style={this.newProjectPromptStyle}>
                    <form style={this.newProjectPromptFormStyle}>
                        <label>Enter a name for your report:<br />
                            <input 
                                type='text'
                                defaultValue={'Unnamed'}
                                onChange={this.changeProjectName}
                            />
                        </label>
                    </form>
                    <button onClick={() => this.createNewProject()}>Create</button>
                </div>)
    }

    renderInspOptions(section) {
        let name = section + 'Option';
        return (<div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            <span key={"Inspected"}>
                                <input type="radio" name={name}/>
                                <p>{"Inspected"}</p>
                            </span><br />

                            <span key={"Not Inspected"}>
                                <input type="radio" name={name} />
                                <p>{"Not Inspected"}</p>
                            </span><br />

                            <span key={"Not Present"}>
                                <input type="radio" name={name} />
                                <p>{"Not Present"}</p>
                            </span><br />
                            
                            <span key={"Deficient"}>
                                <input type="radio" name={name} />
                                <p>{"Deficient"}</p>
                            </span><br />
                        </div>

                        <div className="col-8">
                            {this.renderTextBoxes(section)}
                        </div>

                    </div>
                </div>)
    }

    renderTextBoxes(section) {
        switch (section) {
          case('Foundations'):
              return (<div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label><i>Type of Foundation(s):</i></label>
                                <textarea id='foundationTypes' rows='1' cols='20'></textarea>
                            </div>
                            <div className='col-6'>
                                <label><i>Comments:</i></label>
                                <textarea id='foundationComments' rows='1' cols='20'></textarea>
                            </div>
                        </div>
                      </div>);
          case ('Roof Covering Materials'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Types of Roof Covering:</i></label>
                          <textarea id='roofCoverTypes' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Viewed From:</i></label>
                          <textarea id='roofCoverView' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='roofCoverComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Roof Structures/Attics'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Viewed From:</i></label>
                          <textarea id='roofStructView' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Approximate Average Depth of Insulation:</i></label>
                          <textarea id='roofStructDepth' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='roofStructComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Branch Circuits, Connected Devices, and Fixtures'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of Wiring:</i></label>
                          <textarea id='wiringTypes' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='circuitsComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Heating Equipment'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of Systems:</i></label>
                          <textarea id='heatingTypes' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Energy Sources:</i></label>
                          <textarea id='heatingSources' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='heatingComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Cooling Equipment'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of Systems:</i></label>
                          <textarea id='coolingTypes' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='coolingComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Plumbing Supply, Distribution Systems and Fixtures'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Location of water meter:</i></label>
                          <textarea id='waterMeterLocation' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Location of main water supply valve:</i></label>
                          <textarea id='waterSupplyValve' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                          
                        <div className='col-6'>
                          <label><i>Static water pressure reading:</i></label>
                          <textarea id='staticWaterPressure' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Water Heating Equipment'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Energy Sources:</i></label>
                          <textarea id='waterHeatSources' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Capacity</i></label>
                          <textarea id='waterHeatCapacity' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Swimming Pools, Spas, Hot Tubs, and Equipment'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of Construction:</i></label>
                          <textarea id='poolTypes' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='poolComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Private Water Wells'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of Pump:</i></label>
                          <textarea id='wellPumpType' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Type of Storage Equipment:</i></label>
                          <textarea id='wellEquipment' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='wellComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          case ('Private Sewage Disposal (Septic) Systems'):
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Type of System:</i></label>
                          <textarea id='sewageSystemType' rows='1' cols='20'></textarea>
                        </div>
                        <div className='col-6'>
                          <label><i>Location of Drain Field:</i></label>
                          <textarea id='sewageDrainLocation' rows='1' cols='20'></textarea>
                        </div>
                        
                        <div className="w-100"></div>
                        
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id='sewageComments' rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
          default:
            return (<div className='container'>
                      <div className='row'>
                        <div className='col-6'>
                          <label><i>Comments:</i></label>
                          <textarea id={section + 'Comments'} rows='1' cols='20'></textarea>
                        </div>
                      </div>
                    </div>);
        } 
      }

    renderCategorySection(category) {
        return category.map(section =>
                <div key={section} style={this.inspCategoryStyle} className={"border border-dark"}>
                    <p><b>{section}</b></p><br />
                    <div style={this.innerCategoryStyle}>
                        {this.renderInspOptions(section)}
                    </div>
                </div>)
    }

    renderReportBody(category) {
        let catName = this.getCategoryName(category);
        return (<div>
                    <div style={this.reportBodyHeaderStyle} className={"border border-dark rounded-top"}
                        onClick={() => this.clickReportBodyHeader(category)}>
                    <h4>{catName}</h4>
                    </div>
        
                    <div style={this.reportBodyStyle} 
                        className={this.getCategoryState(category) + " border border-3 border-dark rounded-bottom"}>
                        {this.renderCategorySection(category)}
                    </div>
                </div>)
    }

    renderNewProjectBody() {
        return (<div className={this.newProjectBodyState}>
                {this.renderNewProjectButton()}
                {this.renderNewProjectPrompt()}
                <div className={this.state.newProjectReportBodyState}>
                    <h3>{this.state.newProjectName}</h3>
                    {this.renderReportBody(this.state.structuralSystems)}
                    {this.renderReportBody(this.state.electricalSystems)}
                    {this.renderReportBody(this.state.heatVentAirSystems)}
                    {this.renderReportBody(this.state.plumbingSystems)}
                    {this.renderReportBody(this.state.appliances)}
                    {this.renderReportBody(this.state.optionalSystems)}
                </div>
            </div>)
    }

    renderAccountBody() {
        return (<div style={this.accountBodyStyle}>
                <b>Account</b>
            </div>)
    }

    render() { 
        return (
            <React.Fragment>
                <div style={this.pageStyle} className={"container-fluid"}>

                    <div className={"row border-bottom border-dark"}>
                        {this.renderTitleHeader()}
                    </div>

                    <div style={this.bodyStyle} className={"row"}>

                        <div style={this.sidebarStyle} className={"col-2 border-right border-dark"}>
                            {this.renderSidebarList()}
                        </div>

                        <div className={this.state.homeBodyState + ' col-10'}>
                            {this.renderHomeBody()}
                        </div>

                        <div className={this.state.savedProjectBodyState + ' col-10'}>
                            {this.renderSavedProjectBody()}
                        </div>

                        <div className={this.state.newProjectBodyState + ' col-10'}>
                            {this.renderNewProjectBody()}
                        </div>

                        <div className={this.state.accountBodyState + ' col-10'}>
                            {this.renderAccountBody()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    //Events
    /*
    downloadPdf() {
        let pdfBytes = this.state.pdfForm.save();
        //download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
        <a download={this.state.pdfBytes}></a>
    }*/

    getCategoryName(category){
        switch(category[0]){
            case 'Foundations':
                return 'Structural Systems';
            case 'Service Entrance/Panels':
                return 'Electrical Systems';
            case 'Heating Equipment':
                return 'Heating, Ventilation, and Air Conditioning Systems';
            case 'Plumbing Supply, Distribution Systems and Fixtures':
                return 'Plumbing Systems';
            case 'Dishwashers':
                return 'Appliances';
            case 'Landscape Irrigation (Sprinkler) Systems':
                return 'Optional Systems';
            default:
                return 'Unknown';
        }
      }

    getCategoryState(category){
        switch(category[0]){
            case 'Foundations':
                return this.state.structuralSystemsState;
            case 'Service Entrance/Panels':
                return this.state.electricalSystemsState;
            case 'Heating Equipment':
                return this.state.heatVentAirSystemsState;
            case 'Plumbing Supply, Distribution Systems and Fixtures':
                return this.state.plumbingSystemsState;
            case 'Dishwashers':
                return this.state.appliancesState;
            case 'Landscape Irrigation (Sprinkler) Systems':
                return this.state.optionalSystemsState;
            default:
                return 'Unknown';
        }
    }

    clickNewProjectButton() {
        this.setState({
            newProjectButtonState: 'd-none',
            newProjectPromptState: 'block'
        })
    }

    createNewProject() {
        this.setState({
            newProjectPromptState: 'd-none',
            newProjectReportBodyState: 'block',
        })
    }

    changeProjectName = event => {
        this.setState({
            newProjectName: event.target.value
        })
    }

    //sections: ['Home', 'Saved Projects', 'New Projects', 'Account']
    clickSidebar(section) {
        if (section.localeCompare('Home') === 0) {
            this.setState({
                homeBodyState: 'block',
                savedProjectBodyState: 'd-none',
                newProjectBodyState: 'd-none',
                accountBodyState: 'd-none'
            })
        } else if (section.localeCompare('Saved Projects') === 0) {
            this.setState({
                homeBodyState: 'd-none',
                savedProjectBodyState: 'block',
                newProjectBodyState: 'd-none',
                accountBodyState: 'd-none'
            })
        } else if (section.localeCompare('New Projects') === 0) {
            this.setState({
                homeBodyState: 'd-none',
                savedProjectBodyState: 'd-none',
                newProjectBodyState: 'block',
                accountBodyState: 'd-none'
            })
        } else if (section.localeCompare('Account') === 0) {
            this.setState({
                homeBodyState: 'd-none',
                savedProjectBodyState: 'd-none',
                newProjectBodyState: 'd-none',
                accountBodyState: 'block'
            })
        }
    }

    clickReportBodyHeader(category) {
        let catState = this.getCategoryName(category);

        switch(catState){
            case ('Structural Systems'):
                if (this.state.structuralSystemsState.localeCompare("d-none") === 0){
                    this.setState({
                        structuralSystemsState: 'block'
                    }) 
                } else {
                    this.setState({
                        structuralSystemsState: 'd-none'
                    })
                }
                break;

            case ('Electrical Systems'):
                if (this.state.electricalSystemsState.localeCompare('d-none') === 0){
                    this.setState({
                        electricalSystemsState: 'block'
                    })
                } else {
                    this.setState({
                        electricalSystemsState: 'd-none'
                    })
                }
                break;

            case ('Heating, Ventilation, and Air Conditioning Systems'):
                if (this.state.heatVentAirSystemsState.localeCompare('d-none') === 0){
                    this.setState({
                        heatVentAirSystemsState: 'block'
                    })
                } else {
                    this.setState({
                        heatVentAirSystemsState: 'd-none'
                    })
                }
                break;

            case ('Plumbing Systems'):
                if (this.state.plumbingSystemsState.localeCompare('d-none') === 0){
                    this.setState({
                        plumbingSystemsState: 'block'
                    })
                } else {
                    this.setState({
                        plumbingSystemsState: 'd-none'
                    })
                }
                break;

            case ('Appliances'):
                if (this.state.appliancesState.localeCompare('d-none') === 0){
                    this.setState({
                        appliancesState: 'block'
                    })
                } else {
                    this.setState({
                        appliancesState: 'd-none'
                    })
                }
                break;

            case ('Optional Systems'):
                if (this.state.optionalSystemsState.localeCompare('d-none') === 0){
                    this.setState({
                        optionalSystemsState: 'block'
                    })
                } else {
                    this.setState({
                        optionalSystemsState: 'd-none'
                    })
                }
                break;
            default:
                this.setState({
                    structuralSystemsState: 'd-none',
                    electricalSystemsState: 'd-none',
                    heatVentAirSystemsState: 'd-none',
                    plumbingSystemsState: 'd-none',
                    appliancesState: 'd-none',
                    optionalSystemsState: 'd-none'
                })
        }
    }
}

//https://codesandbox.io/s/controlled-component-uwf8n?file=/src/App.js
 
export default HIApp;