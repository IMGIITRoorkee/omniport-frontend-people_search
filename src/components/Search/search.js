import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Menu, Table, Container, Button, Dropdown, Card, Segment, Grid } from 'semantic-ui-react'

import blocks from '../../css/app.css'
import { setOptions } from '../../actions/index'
import { urlStudentQuery, urlFacultyQuery } from '../../urls'


class Search extends Component {
  state = {
    query: '',
    studentresults: [],
    facultyresults: [],
    residenceOptions: [],
    hide: false,
    visible: false,
    student: true,
    dropIndex: false,
    activeItem: 'all'
  }
  componentDidMount() {
    this.props.SetOptions(this.successCallback, this.errorCallback)
  }

  successCallback = res => {
    const { data } = res
    this.setState({ residenceOptions: data.actions.PUT.residence.choices.map(({ displayName }) => displayName) })
    console.log(this.state.residenceOptions)
  }

  getStudentInfo = () => {
    const { query } = this.state;
    axios({
      method: 'get',
      url: urlStudentQuery,
      params: {
        query
      }
    }).then(response => {
      this.setState({
        studentresults: response.data.results
      })
    })
  }

  getFacultyInfo = () => {
    const { query } = this.state;
    axios({
      method: 'get',
      url: urlFacultyQuery,
      params: {
        query
      }
    }).then(response => {
      this.setState({
        facultyresults: response.data.results
      })
    })
  }

  hide = () => {
    if (this.state.hide === false) {
      this.setState({ hide: true })
    }
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (event.key == 'Enter') {
        this.hide;
      } else {
        if (this.state.query && this.state.query.length > 3) {
          console.log(this.state.query)
          console.log(this.state.studentresults)
          console.log(this.state.facultyresults)
          console.log(this.state.hide)
          console.log(this.state.visible)
          this.hide()
          this.getStudentInfo()
          this.getFacultyInfo()
        } else if (!this.state.query) {
        }
      }
    })
  }
  handleSubmit = () => {
    console.log(this.state.activeItem)
    if (this.state.activeItem == 'all' || this.state.activeItem == 'student') {
      this.hide()
      this.getStudentInfo()
    }
    if (this.state.activeItem == 'all' || this.state.activeItem == 'faculty') {
      this.hide()
      this.getFacultyInfo()
    }
  }

  successStudentCallback = res => {
    this.setState({ studentresults: res.data.results })
  }
  successFacultyCallback = res => {
    this.setState({ facultyresults: res.data.results })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  submitHandler = (e) => {
    e.preventDefault();
  }

  menus = () => {
    const { activeItem } = this.state
    return (
      <div>
        <Menu styleName='blocks.menu'>
          <Menu.Item
            as='Button'
            styleName='blocks.menu-item'
            name='all'
            active={activeItem === 'all'}
            onClick={this.handleItemClick
            }>All</Menu.Item>
          <Menu.Item
            as='Button'
            styleName='blocks.menu-item'
            name='student'
            active={activeItem === 'student'}
            onClick={this.handleItemClick
            }>Student</Menu.Item>
          <Menu.Item
            as='Button'
            styleName='blocks.menu-item'
            name='faculty'
            active={activeItem === 'faculty'}
            onClick={this.handleItemClick}
          >Faculty</Menu.Item>
        </Menu>
      </div>)

  }

  studentList = () => {
    if (this.state.hide === true && (this.state.activeItem === 'student' || this.state.activeItem === 'all')) {
      return (

        <div>
          {this.state.studentresults.map(x =>
            <Segment styleName='blocks.result-segment'>
              <Grid columns='7'>
                <Grid.Column styleName='blocks.result-item' style={{ color: '#6a6cff' }}>{x.name}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.enrolmentNumber}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.branch.code}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.currentYear}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.primary_email_id}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.bhawan}</Grid.Column>
              </Grid>
            </Segment>
          )}
        </div>)
    } else {
      return null
    }
  }

  facultyList = () => {
    if (this.state.hide === true && (this.state.activeItem === 'faculty' || this.state.activeItem === 'all')) {
      return (
        <div>
          {this.state.facultyresults.map(x =>
            <Segment styleName='blocks.result-segment'>
              <Grid columns='4'>
                <Grid.Column styleName='blocks.result-item' style={{ color: '#6a6cff' }}>{x.name}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.department.code}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.designation}</Grid.Column>
              </Grid>
            </Segment>
          )}
        </div>)
    } else {
      return null
    }
  }
  handleDrop = () => {
    this.setState({ dropIndex: !this.state.dropIndex })
  }
  render() {
    const options = [
      {
        key: '1',
        text: '1st',
        value: '1',
      },
      {
        key: '2',
        text: '2nd',
        value: '2',
      },
      {
        key: '3',
        text: '3rd',
        value: '3',
      },
      {
        key: '4',
        text: '4th',
        value: '4',
      },
      {
        key: '5',
        text: '5th',
        value: '5',
      },
      {
        key: '6',
        text: '6th',
        value: '6',
      },
      {
        key: '7',
        text: '7th',
        value: '7',
      },
      {
        key: '8',
        text: '8th',
        value: '8',
      },
    ]
    return (
      <Container styleName='blocks.content-div'>
        <center styleName='blocks.center'>
          <div styleName='blocks.heading'>
            <span styleName='blocks.people'> People </span>
            <span styleName='blocks.search'> Search </span>
          </div>
          <div>
            <form onSubmit={this.submitHandler}>
              <input
                styleName='blocks.search-bar'
                placeholder="Search"
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
              <Button icon onClick={this.handleSubmit} styleName='blocks.icon-button' >
                <Icon name='search' />
              </Button>
            </form>

            <div styleName='blocks.advanced' onClick={this.handleDrop}>
              <span styleName='blocks.link'> Advanced Search </span>
              <Icon name={this.state.dropIndex ? 'chevron up' : 'chevron down'} link onClick={this.handleDrop} styleName='blocks.arrow' />
            </div>
            {this.state.dropIndex ? (
              <div>
                {this.menus()}
                {this.state.activeItem == 'student' ? (
                  <div styleName='blocks.menu'>
                    <Grid columns={3}>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Year"
                          options={options}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Department"
                          options={options}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Bhawan"
                          options={this.state.residenceOptions}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                    </Grid>
                  </div>
                ) : <></>
                }
                {this.state.activeItem == 'faculty' ? (
                  <div styleName='blocks.menu'>
                    <Grid columns={2}>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Designation"
                          options={options}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Department"
                          options={options}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                    </Grid>
                  </div>
                ) : <></>
                }
              </div>

            ) : <></>
            }
            <div> {this.studentList()} </div>
            <div> {this.facultyList()} </div>
          </div >
        </center>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    setOptions: state.setOptions,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetOptions: (successCallback, errCallback) => {
      dispatch(setOptions(successCallback, errCallback))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
