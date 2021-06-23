import React, { Component } from 'react'
import blocks from '../../css/app.css'

class Filters extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { current_year, branch, residence,  designation, department } = this.props.state
        let student = [current_year, branch, residence]
        let faculty = [designation, department]
        return(
            <div styleName="blocks.filters">
                {student.map(param => 
                    param && <div styleName="blocks.filter-item blocks.filter-item-student">{param}</div>
                )}
                {faculty.map(param => 
                    param && <div styleName="blocks.filter-item blocks.filter-item-faculty">{param}</div>
                )}
            </div>
        )
    }
}

export default Filters