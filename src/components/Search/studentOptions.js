import React, { Component } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'

import blocks from '../../css/app.css'

class StudentOptionsComponent extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const{yearOptions, current_year, branchOptions, branch, residenceOptions, residence, dropdownChange} = this.props
        return(
            <div styleName='blocks.menu-student-filters'>
                <Grid columns={4}>
                    <Grid.Column styleName = "blocks.menu-student_items">
                    <Dropdown
                        name='current_year'
                        onChange={(e, { name, value }) => dropdownChange(name, value)}
                        placeholder="Year"
                        options={yearOptions}
                        selection
                        clearable
                        scrolling
                        search
                        value={current_year}
                    />
                    </Grid.Column>
                    <Grid.Column styleName = "blocks.menu-student_items">
                    <Dropdown
                        name='branch'
                        onChange={(e, { name, value }) => dropdownChange(name, value)}
                        placeholder="Branch"
                        options={branchOptions}
                        selection
                        clearable
                        scrolling
                        search
                        value={branch}
                    />
                    </Grid.Column>
                    <Grid.Column styleName = "blocks.menu-student_items">
                    <Dropdown
                        name='residence'
                        onChange={(e, { name, value }) => dropdownChange(name, value)}
                        placeholder="Bhawan"
                        options={residenceOptions}
                        selection
                        clearable
                        scrolling
                        search
                        value={residence}
                    />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default StudentOptionsComponent