import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Button, Loader} from 'semantic-ui-react'
import { debounce } from 'lodash'

import { studentOptions, facultyOptions, whoami } from '../../actions/index'
import { urlStudentQuery, urlFacultyQuery, urlInterestQuery, urlProfile, } from '../../urls'
import blocks from '../../css/app.css'
import StudentList from './studentList'
import FacultyList from './facultyList'
import Menus from './menus'
import StudentOptionsComponent from './studentOptions'
import FacultyOptionsComponent from './facultyOptions'
import AllList from './allList'
import Filters from './filter'
import Pagination from './pagination'

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
    activeItem: 'all',
    shouldScroll : 0,
    studentPage: 1,
    facultyPage: 1,
    studentTotalPages: 1,
    facultyTotalPages: 1,
    loading: false,
    active: true,
  }

  onTabChange = () => {
    this.setState({active: !this.state.active})
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
    const { data } = res;
    
    let residenceName = data.results[0].bhawanInformation

    let residenceCode = data.results[0].bhawanCode

    let residence = {}
    residenceName.forEach((key, i) => residence[key] = residenceCode[i])

    let year = ["1", "2", "3", "4","5","6","7"]
    let branch = data.results[0].branchName

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
      yearOptions: yearList,
      residenceOptions: [...new Set(residenceList)],
      branchOptions: [...new Set(branchList)]
    })
  }
  successFacultyOptionsCallback = res => {
    const { data } = res
    let designationName = Object.keys(data.results[0].designation)
    console.log(designationName);

    let designationCode = Object.values(data.results[0].designation)
    console.log(designationCode);

    let departmentName = Object.keys(data.results[0].department)
    let departmentCode = Object.values(data.results[0].department)

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
  studentSearch = (studentPage = 1) => {
    const { query, branch, current_year, residence } = this.state;
    axios({
      method: 'get',
      url: urlStudentQuery(),
      params: {
        page: studentPage,
        query,
        branch,
        current_year,
        residence
      }
    }).then(response => {
      this.setState( prevState => (
        {
          loading: false,
          shouldScroll : prevState.shouldScroll + 1, 
          studentresults: response.data.results,
          studentTotalPages: response.data.totalPages,
          studentPage: response.data.current,
        }))
    })
  }

  facultySearch = (facultyPage = 1) => {
    const { query, designation, department } = this.state;
    axios({
      method: 'get',
      url: urlFacultyQuery(),
      params: {
        page: facultyPage,
        query,
        designation,
        department
      }
    }).then(response => {
      this.setState( prevState => ({
        loading: false,
        shouldScroll : prevState.shouldScroll + 1, 
        facultyresults: response.data.results,
        facultyTotalPages: response.data.totalPages,
        facultyPage: response.data.current
      }))
    })
  }

  allSearch = async () => {
    const { query, designation, department, branch, current_year, residence  } = this.state;
    
    let response = await axios({
      method: 'get',
      url: urlFacultyQuery(),
      params: {
        query,
        designation,
        department
      }
    })
    
    this.setState( prevState => ({
      shouldScroll : prevState.shouldScroll + 1, 
      facultyresults: response.data.results,
      facultyTotalPages: response.data.totalPages,
      facultyPage: response.data.current,
    }))
    
    response = await axios({
      method: 'get',
      url: urlStudentQuery(),
      params: {
        query,
        branch,
        current_year,
        residence
      }
    })
    

    this.setState( prevState => (
      {
        loading: false,
        shouldScroll : prevState.shouldScroll + 1, 
        studentresults: response.data.results,
        studentTotalPages: response.data.totalPages,
        studentPage: response.data.current,
      }))
  }
  // interestSearch = () => {
  //   const { query, studentPage } = this.state;
  //   axios({
  //     method: 'get',
  //     url: urlInterestQuery(),
  //     params: {
  //       page: studentPage,
  //       query
  //     }
  //   }).then(response => {
  //     this.setState( prevState => ({
  //       shouldScroll : prevState.shouldScroll + 1, 
  //       studentresults: this.state.studentresults.concat(response.data.results),
  //       studentTotalPages: response.data.totalPages
  //     }))
  //   })
  // }

  hide = () => {
    if (this.state.hide === false) {
      this.setState({ hide: true })
    }
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
    if (this.search.value.length > -1) {
      this.setState({loading: true})
      if (this.state.activeItem == 'student') {
        this.hide()
        this.studentSearch()
      }
      if (this.state.activeItem == 'faculty') {
        this.hide()
        this.facultySearch()
      }
      if(this.state.activeItem == 'all'){
        this.hide()
        this.allSearch()
      }
    }
  }
  handleSubmit = () => {
    if (this.state.query.length > -1) {
      this.setState({loading: true})
      if (this.state.activeItem == 'student') {
        this.hide()
        this.studentSearch()
      }
      if (this.state.activeItem == 'faculty') {
        this.hide()
        this.facultySearch()
      }
      if(this.state.activeItem == 'all'){
        this.hide()
        this.allSearch()
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

  handleDrop = () => {
    this.setState({ dropIndex: !this.state.dropIndex })
  }
  dropdownChange = (name, value) => {
    this.setState({ [name]: value });
  }
  onChangeFacultyPage = (p) => {
    this.setState({
      facultyPage : p
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.shouldScroll != this.state.shouldScroll){
      const element = document.getElementById('scrollTo');
      element.scrollIntoView({behavior: 'smooth'});
    }
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
                placeholder="Search By Interest, Enrollment Number, Name, or Residence "
                ref={input => this.search = input}
                onChange={debounce(this.handleInputChange,500)}
              />
            </form>

            <div styleName='blocks.advanced' onClick={this.handleDrop}>
              <span styleName='blocks.link'> Advanced Search </span>
              <Icon name={this.state.dropIndex ? 'chevron up' : 'chevron down'} link onClick={this.handleDrop} styleName='blocks.arrow' />
            </div >
            {this.state.dropIndex ? (
              <div styleName='blocks.advanced-all'>
                <Menus activeItem={this.state.activeItem} handleItemClick={this.handleItemClick}/>
                {this.state.activeItem == 'student' ? (
                  <StudentOptionsComponent yearOptions={yearOptions} current_year={current_year} branchOptions={branchOptions} branch={branch} residenceOptions={residenceOptions} residence={residence} dropdownChange={this.dropdownChange}/>
                  ) : <></>
                }
                {this.state.activeItem == 'faculty' ? (
                  <FacultyOptionsComponent designationOptions={designationOptions} designation={designation} departmentOptions={departmentOptions} department={department} dropdownChange={this.dropdownChange}/>
                ) : <></>
                }
              </div>

            ) : <></>
            }
            <div styleName='blocks.submit-menu'>
              <Button onClick={this.handleSubmit} styleName='blocks.icon-button' style={{ backgroundColor: '#6a6cff', color: '#ffffff' }}>
                {this.state.loading ?
                  <Loader inline inverted active/> : 'Search'
                }
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
            <div id="scrollTo"></div>
            {this.state.hide === true && (this.state.activeItem === 'student') && <StudentList history={this.props.history} showHead={false} studentresults={this.state.studentresults}/>}

            {this.state.hide === true && (this.state.activeItem === 'faculty') && <FacultyList showHead={false} facultyresults={this.state.facultyresults}/>}

            {this.state.hide === true && (this.state.activeItem === 'all') && 
              <>
              <Filters yearOptions={yearOptions} current_year={current_year} branch={branch} branchOptions={branchOptions} residence={residence} residenceOptions={residenceOptions} designationOptions={designationOptions} designation={designation} department={department} departmentOptions={departmentOptions} />
              <AllList onChange={this.onTabChange} active={this.state.active}studentresults={this.state.studentresults} facultyresults={this.state.facultyresults} history={this.props.history}/>
              </>
            }
            { this.state.hide === true && (this.state.activeItem === 'student' || ( this.state.activeItem === 'all' && this.state.active) ) && <Pagination pageNumber={this.state.studentPage} totalPages={this.state.studentTotalPages} onChangePage={(p) => this.studentSearch(p)}/> }
            { this.state.hide === true && (this.state.activeItem === 'faculty' || ( this.state.activeItem === 'all' && !this.state.active) ) && <Pagination pageNumber={this.state.facultyPage} totalPages={this.state.facultyTotalPages} onChangePage={(p) => this.facultySearch(p)}/> }
          </div>
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
