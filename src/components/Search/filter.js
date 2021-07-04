import React, { Component } from 'react'
import blocks from '../../css/app.css'

class Filters extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { yearOptions, current_year, branchOptions, branch, residenceOptions, residence, designationOptions, designation, departmentOptions, department } = this.props
        let yearVal = yearOptions.find( o => o.key===current_year)
        let branchVal = branchOptions.find( o => o.key===branch)
        let residenceVal = residenceOptions.find( o => o.key===residence)
        let designationVal = designationOptions.find( o => o.key===designation)
        let depVal = departmentOptions.find( o => o.key===department)
        return(
            <div styleName="blocks.filters">
                {yearVal && <div styleName="blocks.filter-item blocks.filter-item-student">{yearVal.text}</div>}
                {branchVal && <div styleName="blocks.filter-item blocks.filter-item-student">{branchVal.text}</div>}
                {residenceVal && <div styleName="blocks.filter-item blocks.filter-item-student">{residenceVal.text}</div>}
                
                {designationVal && <div styleName="blocks.filter-item blocks.filter-item-faculty">{designationVal.text}</div>}
                {depVal && <div styleName="blocks.filter-item blocks.filter-item-faculty">{depVal.text}</div>}
            </div>
        )
    }
}

export default Filters
