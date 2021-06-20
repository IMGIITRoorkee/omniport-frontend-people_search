import React, { Component } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import blocks from '../../css/app.css'

class FacultyList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
            {this.props.showHead && <div styleName='blocks.search-title-heading'> Faculty </div>}
            {this.props.facultyresults.length ? 
            this.props.facultyresults.map(x =>
                <Segment styleName='blocks.result-segment'>
                <Grid columns='9'>
                    <Grid.Column styleName='blocks.result-item-name' width={1} style={{ color: '#6a6cff' }} >{x.name}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item-branch-faculty' width={5}>{x.department.name}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item-branch-faculty' width={3}>{x.designation}</Grid.Column>
                </Grid>
                </Segment>
            ) : 
            <div styleName='blocks.no-match'>There is no faculty matching your query</div>
            }
            </div>
        )
    }
}

export default FacultyList