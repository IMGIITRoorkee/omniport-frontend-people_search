import React, { Component } from 'react'
import StudentList from './studentList'
import FacultyList from './facultyList'

import blocks from '../../css/app.css'

class AllList extends Component{
    constructor(props){
        super(props)
        this.state = {active: true}
    }
    onChange = () => {
        this.setState({active: !this.state.active})
    }

    render(){
        return(
            <div styleName='blocks.student-div'>
                <div styleName='blocks.tabMenu'>
                    <button styleName={"blocks.search-title-heading blocks.tabMenuItem " + (this.state.active?"blocks.tabMenuItem-color":"")} onClick={this.onChange}> Students </button>
                    <button styleName={"blocks.search-title-heading blocks.tabMenuItem " + (!this.state.active?"blocks.tabMenuItem-color":"")} onClick={this.onChange}> Faculty </button>
                </div>
                {this.state.active && <StudentList showHead={false} studentresults={this.props.studentresults}/>}
                {!this.state.active && <FacultyList showHead={false} facultyresults={this.props.facultyresults}/>}
            </div>
        )
    }
}

export default AllList