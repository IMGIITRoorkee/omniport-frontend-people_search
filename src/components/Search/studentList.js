import React, { Component } from 'react'
import { Menu, Dropdown, Segment, Grid } from 'semantic-ui-react'

import blocks from '../../css/app.css'

class StudentList extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        
        return (
            <div styleName='blocks.student-div'>
            {this.props.showHead && <div styleName='blocks.search-title-heading'> Students </div>}
            {this.props.studentresults.length ? 
            this.props.studentresults.map(x =>
                <Segment styleName='blocks.result-segment'>
                <Grid columns='8'>
                    <Grid.Column styleName='blocks.result-item-name' width={2} style={{ color: '#6a6cff' }} >{x.fullName}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item' width={1}>{x.enrolmentNumber}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item' width={3}>{x.branchName}</Grid.Column>
                    {x.currentYear==3 ? (
                    <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"rd"}</Grid.Column>
                    ) : 
                    x.currentYear==2 ? (
                        <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"nd"}</Grid.Column>
                    ) : 
                        x.currentYear==1 ? (
                            <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"st"}</Grid.Column>
                            ) : (
                        <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"th"}</Grid.Column>
                    )}
                    <Grid.Column styleName='blocks.result-item' width={2}>{x.emailAddress}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item' width={2}>{x.mobileNumber}</Grid.Column>
                    <Grid.Column styleName='blocks.result-item' width={2}>{x.roomNoInformation}{"  "}{x.bhawanInformation}</Grid.Column>
                    {x.interests.length !== 0 &&
                    <Grid.Column styleName='blocks.result-item-interests' width={2}>
                        <Menu vertical size='mini'>
                        <Dropdown item text='Interests'>
                            <Dropdown.Menu>
                            {x.interests.map((item, i) => (
                                <Dropdown.Item>{item}</Dropdown.Item>
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Menu>
                    </Grid.Column>
                    }
                </Grid>
                </Segment>
            ) : 
            <div styleName='blocks.no-match'>There are no students matching your query</div>
            }
            </div>
            )
          
    }
}

export default StudentList