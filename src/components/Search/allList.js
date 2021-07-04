import React, { Component } from 'react'
import StudentList from './studentList'
import FacultyList from './facultyList'

import blocks from '../../css/app.css'

class AllList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {onChange, active} = this.props
        return(
            <div styleName='blocks.student-div'>
                <div styleName='blocks.tabMenu'>
                    <button styleName={"blocks.search-title-heading blocks.tabMenuItem blocks.tabMenuItemStudent " + (active?"blocks.tabMenuItem-color":"")} onClick={onChange}> Students </button>
                    <button styleName={"blocks.search-title-heading blocks.tabMenuItem blocks.tabMenuItemFaculty " + (!active?"blocks.tabMenuItem-color":"")} onClick={onChange}> Faculty </button>
                </div>
                {active && <StudentList history={this.props.history} showHead={false} studentresults={this.props.studentresults}/>}
                {!active && <FacultyList showHead={false} facultyresults={this.props.facultyresults}/>}
            </div>
        )
    }
}

export default AllList