import React, { Component } from 'react'
import PatientFiles from "./PatientFiles";
import PatientFile from "./PatientFile";
import './patientfile.css';

class PatientContainer extends Component {
    constructor() {
        super()
   
        this.state = {
            patients: [],
            patient: {},
            isPatientViewOn: false,
            sortValue: "",
            inputValue: "",

        }
        this.patientFilterOnChange = this.patientFilterOnChange.bind(this);
        this.handleSortPatients = this.handleSortPatients.bind(this);
        this.sortPatients = this.sortPatients.bind(this);
        this.handlePatientView = this.handlePatientView.bind(this);
        this.handlePatientGoBack = this.handlePatientGoBack.bind(this);
    }
        componentDidMount() {
            this.setState({ patients: this.props.patients })
    }
    
        patientFilterOnChange = (e) => {
            console.log("hi from onChange", e.target.value)
            this.setState({
                inputValue: e.target.value
            });
    }
    
    handleSortPatients = (e) => {
            this.setState({sortValue: e.target.value})
    }
    
    sortPatients = (patients) => {
        if (this.state.sortValue === "name") {
            return [...patients].sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            })
        }
        else if (this.state.sortValue === "surname") {
            return [...patients].sort((a, b) => {
                if (a.surname > b.surname) {
                    return 1
                } else if (a.surname < b.surname) {
                    return -1
                } else {
                    return 0
                }
            })
        }
        else {
            return patients;
        }
    }
    
    handlePatientView = (patientItem) => {
        this.setState({
            patient: patientItem,
            isPatientViewOn: !this.state.isPatientViewOn
        })
    }

    handlePatientGoBack = () => {
        this.setState({
            pet: {},
            isPatientViewOn: false
        })
    }
    
    render() {

        const filteredPatients = this.state.patients.filter(patient => {
            return patient.name.toLowerCase().includes(this.state.inputValue.toLowerCase())
        })

        return (
            <div className="patient-container">
                <label>Sort Patients</label>

                <select name="sortValue" onChange={this.handleSortPatients}>
                    <option value="All">All</option>
                    <option value="name">Name</option>
                    <option value="surname">Surname</option>
                </select>
                {this.state.isPatientViewOn ?
                    <PatientFile 
                    patient={this.state.patient}
                    handlePatientGoBack={this.handlePatientGoBack}
                    />
                    :
                    <PatientFiles
                        patients={this.sortPatients(filteredPatients)}
                        handlePatientView={this.handlePatientView}
                        patientFilterOnChange={this.patientFilterOnChange}
                        inputValue={this.state.inputValue}
                    />
    }
            </div>
        )
    }
}
export default PatientContainer