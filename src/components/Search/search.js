import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Menu, Table, Container, Button, Dropdown, Card, Segment, Grid } from 'semantic-ui-react'

import blocks from '../../css/app.css'
import { studentOptions, facultyOptions } from '../../actions/index'
import { urlStudentQuery, urlFacultyQuery, urlInterestQuery } from '../../urls'


class Search extends Component {
  state = {
    query: '',
    studentresults: [],
    facultyresults: [],
    residenceOptions: [],
    yearOptions: [],
    branchOptions: [],
    designationOptions: [],
    departmentOptions: [],
    hide: false,
    visible: false,
    student: true,
    dropIndex: false,
    activeItem: 'all'
  }
  componentDidMount() {
    this.props.StudentOptions(this.successStudentOptionsCallback, this.errorCallback)
    this.props.FacultyOptions(this.successFacultyOptionsCallback, this.errorCallback)
  }

  successStudentOptionsCallback = res => {
    const { data } = res
    let residence = [...new Set(data.results.map(({ bhawanInformation }) => bhawanInformation).filter(x => x))]
    let year = [...new Set(data.results.map(({ currentYear }) => currentYear).filter(x => x))]
    let branch = [...new Set(data.results.map(({ branchName }) => branchName).filter(x => x))]
    var residenceList = []
    var yearList = []
    var branchList = []
    residence.forEach(function (element) {
      residenceList.push({ key: element, text: element, value: element })
    })
    year.forEach(function (element) {
      yearList.push({ key: element, text: element, value: element })
    })
    branch.forEach(function (element) {
      branchList.push({ key: element, text: element, value: element })
    })

    this.setState({
      yearOptions: [...new Set(yearList)],
      residenceOptions: [...new Set(residenceList)],
      branchOptions: [...new Set(branchList)]
    })
  }
  successFacultyOptionsCallback = res => {
    const { data } = res
    let designation = data.results.map(({ designation }) => designation).filter(x => x)
    let departments = data.results.map(({ department }) => department).filter(x => x).map(({ name }) => name)
    var designationList = []
    var departmentsList = []
    designation.forEach(function (element) {
      designationList.push({ key: element, text: element, value: element })
    })
    departments.forEach(function (element) {
      departmentsList.push({ key: element, text: element, value: element })
    })
    this.setState({
      designationOptions: [...new Set(designationList)],
      departmentOptions: [...new Set(departmentsList)]
    })
  }
  studentSearch = () => {
    const { query } = this.state;
    axios({
      method: 'get',
      url: urlStudentQuery(),
      params: {
        query
      }
    }).then(response => {
      this.setState({
        studentresults: response.data.results
      })
    })
  }

  facultySearch = () => {
    const { query } = this.state;
    axios({
      method: 'get',
      url: urlFacultyQuery(),
      params: {
        query
      }
    }).then(response => {
      this.setState({
        facultyresults: response.data.results
      })
    })
  }
  interestSearch = () => {
    const { query } = this.state;
    axios({
      method: 'get',
      url: urlInterestQuery(),
      params: {
        query
      }
    }).then(response => {
      this.setState({
        studentresults: this.state.studentresults.concat(response.data.results)
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
          this.hide()
          this.studentSearch()
          this.facultySearch()
          this.interestSearch()
        } else if (!this.state.query) {
        }
      }
    })
  }
  handleSubmit = () => {
    if (this.state.query.length > 0) {
      if (this.state.activeItem == 'all' || this.state.activeItem == 'student') {
        this.hide()
        this.studentSearch()
        this.interestSearch()
      }
      if (this.state.activeItem == 'all' || this.state.activeItem == 'faculty') {
        this.hide()
        this.facultySearch()
      }
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
                <Grid.Column styleName='blocks.result-item' style={{ color: '#6a6cff' }}>{x.fullName}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.enrolmentNumber}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.branchName}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.currentYear}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.emailAddress}</Grid.Column>
                <Grid.Column styleName='blocks.result-item'>{x.bhawanInformation}</Grid.Column>
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
    const { residenceOptions, yearOptions, branchOptions, designationOptions, departmentOptions } = this.state
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
                          options={yearOptions}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Branch"
                          options={branchOptions}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Bhawan"
                          options={residenceOptions}
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
                          options={designationOptions}
                          selection
                          search
                          fluid
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          placeholder="Department"
                          options={departmentOptions}
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
    studentOptions: state.studentOptions,
    facultyOptions: state.facultyOptions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    StudentOptions: (successCallback, errCallback) => {
      dispatch(studentOptions(successCallback, errCallback))
    },
    FacultyOptions: (successCallback, errCallback) => {
      dispatch(facultyOptions(successCallback, errCallback))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
