import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Menu, Container, Button, Dropdown, Segment, Grid } from 'semantic-ui-react'

import { studentOptions, facultyOptions, whoami } from '../../actions/index'
import { urlStudentQuery, urlFacultyQuery, urlInterestQuery, urlProfile, appBaseUrl } from '../../urls'

import blocks from '../../css/app.css'

class Search extends Component {
  state = {
    query: '',
    branch: '',
    current_year: '',
    residence: '',
    designation: '',
    department: '',
    selfId: '',
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
    studentRole: false,
    activeItem: 'all'
  }
  componentDidMount() {
    this.props.StudentOptions(this.successStudentOptionsCallback, this.errorCallback)
    this.props.FacultyOptions(this.successFacultyOptionsCallback, this.errorCallback)
    this.props.Whoami(this.successUserCheck, this.errorCallback)
  }
  successUserCheck = res => {
    if (res.data.roles[0].role === 'Student') {
      this.setState({ studentRole: true, selfId: res.data.roles[0].data.id })
    }
  }
  successStudentOptionsCallback = res => {
    const { data } = res
    let residenceName = [...new Set(data.results.map(({ bhawanInformation }) => bhawanInformation).filter(x => x))]
    let residenceCode = [...new Set(data.results.map(({ bhawanCode }) => bhawanCode).filter(x => x))]
    let residence = {}
    residenceName.forEach((key, i) => residence[key] = residenceCode[i])
    let year = [...new Set(data.results.map(({ currentYear }) => currentYear).filter(x => x))]
    let branch = [...new Set(data.results.map(({ branchName }) => branchName).filter(x => x))]
    var residenceList = []
    var yearList = []
    var branchList = []
    Object.keys(residence).forEach(key => {
      residenceList.push({ key: residence[key], text: key, value: residence[key] })
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
    let designationName = data.results.map(({ designation }) => designation).filter(x => x)
    let designationCode = data.results.map(({ designationCode }) => designationCode).filter(x => x)
    let departmentName = data.results.map(({ department }) => department).filter(x => x).map(({ name }) => name)
    let departmentCode = data.results.map(({ department }) => department).filter(x => x).map(({ code }) => code)
    let department = {}
    departmentName.forEach((key, i) => department[key] = departmentCode[i])
    let designation = {}
    designationName.forEach((key, i) => designation[key] = designationCode[i])
    var designationList = []
    var departmentsList = []
    Object.keys(designation).forEach(key => {
      designationList.push({ key: designation[key], text: key, value: designation[key] })
    })
    Object.keys(department).forEach(key => {
      departmentsList.push({ key: department[key], text: key, value: department[key] })
    })
    this.setState({
      designationOptions: [...new Set(designationList)],
      departmentOptions: [...new Set(departmentsList)]
    })
  }
  studentSearch = () => {
    const { query, branch, current_year, residence } = this.state;
    axios({
      method: 'get',
      url: urlStudentQuery(),
      params: {
        query,
        branch,
        current_year,
        residence
      }
    }).then(response => {
      this.setState({
        studentresults: response.data.results
      })
    })
  }

  facultySearch = () => {
    const { query, designation, department } = this.state;
    axios({
      method: 'get',
      url: urlFacultyQuery(),
      params: {
        query,
        designation,
        department
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

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

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
            name='all'
            active={activeItem === 'all'}
            styleName={activeItem != "all" ? "blocks.menu-item" : "blocks.menu-item-color"}
            onClick={this.handleItemClick
            }>All</Menu.Item>
          <Menu.Item
            as='Button'
            styleName={activeItem != "student" ? "blocks.menu-item" : "blocks.menu-item-color"}
            name='student'
            active={activeItem === 'student'}
            onClick={this.handleItemClick
            }>Student</Menu.Item>
          <Menu.Item
            as='Button'
            styleName={activeItem != "faculty" ? "blocks.menu-item" : "blocks.menu-item-color"}
            name='faculty'
            active={activeItem === 'faculty'}
            onClick={this.handleItemClick}
          >Faculty</Menu.Item>
        </Menu>
      </div>)

  }
  profileDirect = (id) => {
    this.props.history.push({
      pathname: urlProfile(),
      state: { id: id }
    })
  }
  studentHomepage = (id) => {
    this.props.history.push({ pathname: `/student_profile/${id}` })
  }
  facultyHomepage = (id) => {
    this.props.history.push({ pathname: `/faculty_profile/${id}` })
  }
  studentList = () => {
    if (this.state.hide === true && (this.state.activeItem === 'student' || this.state.activeItem === 'all')) {
      return (
        <div>
          {this.state.studentresults.map(x =>
            <Segment styleName='blocks.result-segment'>
              <Grid columns='16'>
                <Grid.Column styleName='blocks.result-item-name' width={1} style={{ color: '#6a6cff' }} >{x.fullName}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={1}>{x.enrolmentNumber}</Grid.Column>
                <Grid.Column styleName='blocks.result-item-branch' width={3}>{x.branchName}</Grid.Column>
                {x.currentYear==3 ? (
                  <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"rd"}</Grid.Column>
                ) : 
                  x.currentYear==2 ? (
                    <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"nd"}</Grid.Column>
                  ) : 
                      x.currentYear==1 ? (
                        <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"st"}</Grid.Column>
                        ) : (
                    <Grid.Column styleName='blocks.result-item' width={1}>{x.currentYear}{"rd"}</Grid.Column>
                  )}
                <Grid.Column styleName='blocks.result-item' width={2}>{x.emailAddress}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={1}>{x.mobileNumber}</Grid.Column>
                <Grid.Column styleName='blocks.result-item' width={3}>{x.roomNoInformation}{"  "}{x.bhawanInformation}</Grid.Column>
                {x.interests.length !== 0 &&
                  <Grid.Column styleName='blocks.result-item-interest' width={2}>
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
                <Grid.Column styleName='blocks.result-item' style={{ color: '#6a6cff' }} >{x.name}</Grid.Column>
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
    const { residenceOptions, yearOptions, branchOptions, designationOptions, departmentOptions, current_year, branch, residence, designation, department, selfId } = this.state
    return (
      <div styleName='blocks.content-div'>
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
            </div >
            {this.state.dropIndex ? (
              <div styleName='blocks.advanced-all'>
                {this.menus()}
                {this.state.activeItem == 'student' ? (
                  <div styleName='blocks.menu-student-filters'>
                    <Grid columns={4}>
                      <Grid.Column styleName = "blocks.menu-student_items">
                        <Dropdown
                          name='current_year'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Year"
                          styleName = "blocks.menu-student_items"
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
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
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
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
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
                ) : <></>
                }
                {this.state.activeItem == 'faculty' ? (
                  <div styleName='blocks.menu-student-filters'>
                    <Grid columns={4}>
                      <Grid.Column styleName = "blocks.menu-faculty_items">
                        <Dropdown
                          name='designation'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Designation"
                          options={designationOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={designation}
                        />
                      </Grid.Column >
                      <Grid.Column styleName = "blocks.menu-faculty_items">
                        <Dropdown
                          name='department'
                          onChange={(e, { name, value }) => this.dropdownChange(name, value)}
                          placeholder="Department"
                          options={departmentOptions}
                          selection
                          clearable
                          scrolling
                          search
                          value={department}
                        />
                      </Grid.Column>
                    </Grid>
                  </div>
                ) : <></>
                }
              </div>

            ) : <></>
            }
            <div styleName='blocks.submit-menu'>
              <Button onClick={this.handleSubmit} styleName='blocks.icon-button' style={{ backgroundColor: '#6a6cff', color: '#ffffff' }}>
                Search
              </Button>
              {this.state.studentRole && (
                <Button
                  secondary
                  onClick={(e) => this.profileDirect(selfId)}
                  styleName='blocks.icon-button'
                  style={{ backgroundColor: '#303030', color: '#ffffff' }}>
                  Edit Visibility
                </Button>
              )
              }
            </div>
            <div> {this.studentList()} </div>
            <div> {this.facultyList()} </div>
          </div >
        </center>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    studentOptions: state.studentOptions,
    facultyOptions: state.facultyOptions,
    whoami: state.whoami
  }
}
const mapDispatchToProps = dispatch => {
  return {
    StudentOptions: (successCallback, errCallback) => {
      dispatch(studentOptions(successCallback, errCallback))
    },
    FacultyOptions: (successCallback, errCallback) => {
      dispatch(facultyOptions(successCallback, errCallback))
    },
    Whoami: (successCallback, errCallback) => {
      dispatch(whoami(successCallback, errCallback))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)