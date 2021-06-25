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
                <div styleName='blocks.result-segment'>
                <div style={{display:"flex", flexWrap:"wrap"}}>
                    <div styleName='blocks.result-item'  style={{ color: '#6a6cff'}} >{x.fullName}</div>
                    <div styleName='blocks.result-item'>{x.enrolmentNumber}</div>
                    <div styleName='blocks.result-item'>{x.branchName}</div>
                    {x.currentYear==3 ? (
                    <div styleName='blocks.result-item'>{x.currentYear}{"rd"}</div>
                    ) : 
                    x.currentYear==2 ? (
                        <div styleName='blocks.result-item' >{x.currentYear}{"nd"}</div>
                    ) : 
                        x.currentYear==1 ? (
                            <div styleName='blocks.result-item' >{x.currentYear}{"st"}</div>
                            ) : (
                        <div styleName='blocks.result-item' >{x.currentYear}{"th"}</div>
                    )}
                    <div styleName='blocks.result-item' >{x.emailAddress}</div>
                    <div styleName='blocks.result-item' >{x.mobileNumber}</div>
                    <div styleName='blocks.result-item' >{x.roomNoInformation}{"  "}{x.bhawanInformation}</div>
                </div>

                    {x.interests.length !== 0 &&
                    <div styleName="blocks.filters" style={{marginBottom:"0px"}}>
                   
                            {x.interests.map((item, i) => (
                                <div styleName="blocks.filter-item blocks.filter-item-student">{item}</div>
                            ))}
                    </div>
                    }
                
                </div>
            ) : 
            <div styleName='blocks.no-match'>There are no students matching your query</div>
            }
            </div>
            )
          
    }
}

export default StudentList