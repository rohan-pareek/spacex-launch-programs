import React, { Component } from 'react'
import { connect } from 'react-redux'
import Program from './Program';
import { fetchPrograms } from '../actions/programs';

class ProgramList extends Component {

    constructor(props) {
        super();

        // default api on page load
        props.fetchPrograms({
            url: 'https://api.spaceXdata.com/v3/launches?limit=100'
        });
    }

    render() {
        return (
            <div className = "program-list">
                {!this.props.loader && this.props.programList.map((program, i) => (
                    <Program program = {program} key = {program.flight_number+program.mission_name} />
                ))}

                {/* Loading text */}
                {this.props.loader && <h1>Loading SpaceX Launch Programs...</h1>}

                {/* Fallback text of no program is found */}
                {this.props.programList.length === 0 
                && !this.props.loader
                && <h1>No Programs Found...</h1>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        programList: state.programs.programList,
        loader: state.programs.loader
})

export default connect(mapStateToProps, {fetchPrograms})(ProgramList);
