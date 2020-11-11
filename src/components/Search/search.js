import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Menu, Container, Button, Dropdown, Segment, Grid } from 'semantic-ui-react'

import { studentOptions, facultyOptions } from '../../actions/index'
import { urlStudentQuery, urlFacultyQuery, urlInterestQuery, urlProfile } from '../../urls'

import blocks from '../../css/app.css'

class Search extends Component {
  state = {
    query: '',
    branch_param: '',
    current_year_param: '',
    bhawan_param: '',
    designation_param: '',
    department_param: '',
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
    const { query, branch_param, current_year_param, bhawan_param } = this.state;
    axios({
      method: 'get',
      url: urlStudentQuery(),
      params: {
        query,
        branch_param,
        current_year_param,
        bhawan_param
      }
    }).then(response => {
      this.setState({
        studentresults: response.data.results
      })
    })
  }

  facultySearch = () => {
    const { query, designation_param, department_param } = this.state;
    axios({
      method: 'get',
      url: urlFacultyQuery(),
      params: {
        query,
        designation_param,
        department_param
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
  profileDirect = (id) => {
    this.props.history.push({ pathname: `${urlProfile()}${id}` })
    console.log(`${urlProfile()}${id}`)
  }
  studentList = () => {
    if (this.state.hide === true && (this.state.activeItem === 'student' || this.state.activeItem === 'all')) {
      return (
        <div>
          {this.state.studentresults.map(x =>
            <Segment styleName='blocks.result-segment'>
              <Grid columns='7'>
                <Grid.Column styleName='blocks.result-item' width={3} style={{ color: '#6a6cff' }} onClick={(e) => this.profileDirect(x.enrolmentNumber)}>{x.fullName}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={2}>{x.enrolmentNumber}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={1}>{x.branchName}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={3}>{x.emailAddress}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={3}>{x.bhawanInformation}</Grid.Column>
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
                <Grid.Column styleName='blocks.result-item' style={{ color: '#6a6cff' }} onClick={(e) => this.profileDirect(x.employeeId)}>{x.name}</Grid.Column>
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
  dropdownChange = (name, value) => {
    this.setState({ [name]: value })
  }
  render() {
    const { residenceOptions, yearOptions, branchOptions, designationOptions, departmentOptions, current_year_param, branch_param, bhawan_param, designation_param, department_param } = this.state
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
                          name='current_year_param'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Year"
                          options={yearOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={current_year_param}
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          name='branch_param'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Branch"
                          options={branchOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={branch_param}
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          name='bhawan_param'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Bhawan"
                          options={residenceOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={bhawan_param}
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
                          name='designation_param'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Designation"
                          options={designationOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={designation_param}
                        />
                      </Grid.Column>
                      <Grid.Column floated='left'>
                        <Dropdown
                          name='department_param'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Department"
                          options={departmentOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={department_param}
                        />
                      </Grid.Column>
                    </Grid>
                  </div>
                ) : <></>
                }
              </div>

            ) : <></>
            }
            <div styleName='blocks.menu'>
              <Button onClick={this.handleSubmit} styleName='blocks.icon-button' style={{ backgroundColor: '#6a6cff', color: '#ffffff' }}>
                Search
              </Button>
            </div>
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
