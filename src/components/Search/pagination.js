import React, { Component } from 'react'
import blocks from '../../css/app.css'
import { Icon} from 'semantic-ui-react'

class Pagination extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { pageNumber, totalPages, onChangePage } = this.props
        let pages = [0,0,0,0]
        let lastPage = pageNumber + (4 - pageNumber%4)*(pageNumber%4 != 0)

        for(let i = 0; i<4; i++){
            pages[i] = lastPage - 3 + i;
        }

        return(
            <div style={{display: 'flex', justifyContent: 'space-around', width: '250px',marginBottom:"1em"}}>
                <button disabled={pages[0] == 1 } onClick={() => onChangePage(pages[0]-1)} styleName={`blocks.angleIcon${pages[0] != 1 ? '-active' : ''}`}>
                    <Icon name='angle left'></Icon>
                </button>
                {pages.map( (e) => {
                    if(e<=totalPages)
                    return(
                        <button onClick={() => onChangePage(e)} styleName={`blocks.pageNumber${e==pageNumber ? '-active' : ''}`} disabled={e==pageNumber} key={e}>
                            {e}
                        </button>
                )})}
                <button onClick={() => onChangePage(pages[3]+1)} disabled={pages[3] >= totalPages } styleName={`blocks.angleIcon${pages[3] < totalPages ? '-active' : ''}`}>
                    <Icon name='angle right'></Icon>
                </button>
            </div>
        )
    }
}

export default Pagination