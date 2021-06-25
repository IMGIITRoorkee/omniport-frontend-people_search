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
                <div styleName='blocks.result-segment'>
                <div style={{display:"flex", flexWrap:"wrap"}}>
                    <div styleName='blocks.result-item'  style={{ color: '#6a6cff' }} >{x.name}</div>
                    <div styleName='blocks.result-item'  >{x.department.name}</div>
                    <div styleName='blocks.result-item'  >{x.designation}</div>
                </div>
                </div>
            ) : 
            <div styleName='blocks.no-match'>There is no faculty matching your query</div>
            }
            </div>
        )
    }
}

export default FacultyList