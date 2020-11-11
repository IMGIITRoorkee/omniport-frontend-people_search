import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu, Message, List, Button, Form, Rail, Modal, Card, Checkbox, Grid, Image, Container } from 'semantic-ui-react'

import { DefaultDP } from 'formula_one'
import { facultyProfile, studentProfile, setVisibility } from '../../actions/index'

import blocks from '../../css/app.css'


class Profile extends Component {
  state = {
    facultyInfo: [],
    studentInfo: [],
    emailVisibility: '',
    mobileNumberVisibility: '',
    roomNumberVisibility: '',
    bhawanVisibility: '',
    error: false,
    open: false
  }
  componentDidMount() {
    this.props.FacultyProfile(this.props.match.params.id, this.successFacultyCallback, this.errFacultyCallback)
    this.props.StudentProfile(this.props.match.params.id, this.successStudentCallback, this.errStudentCallback)
  }
  successFacultyCallback = res => {
    this.setState({ facultyInfo: res.data })
  }
  errFacultyCallback = err => {
    this.setState({ error: true })
  }
  successStudentCallback = res => {
    this.setState({
      studentInfo: res.data,
      emailVisibility: res.data.primaryEmailId,
      mobileNumberVisibility: res.data.primaryMobileNo,
      roomNumberVisibility: res.data.roomNo,
      bhawanVisibility: res.data.bhawan
    })
  }
  errStudentCallback = err => {
    this.setState({ error: true })
  }
  showModal = () => {
    this.setState({ open: true })
  }
  visibilityModal = (name) => {
    return (
      <List.Content floated='right'>
        <Modal
          trigger={<Icon link name='users' onClick={this.showModal} />}
          size='tiny'
          closeIcon
          open={this.state.open}
        >
          <Modal.Header><h3 style={{ color: '#6a6cff' }}>Show To</h3></Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Checkbox
                  label='All'
                  name={name}
                  value='all'
                  checked={this.state[name] === 'all'}
                  onChange={(e, { name, value }) => this.handleChange(name, value)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Only Students'
                  name={name}
                  value='students'
                  checked={this.state[name] === 'students'}
                  onChange={(e, { name, value }) => this.handleChange(name, value)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Only Faculty'
                  name={name}
                  value='faculty'
                  checked={this.state[name] === 'faculty'}
                  onChange={(e, { name, value }) => this.handleChange(name, value)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Only Branch'
                  name={name}
                  value='branch'
                  checked={this.state[name] === 'branch'}
                  onChange={(e, { name, value }) => this.handleChange(name, value)}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label='Only Bhawan'
                  name={name}
                  value='bhawan'
                  checked={this.state[name] === 'bhawan'}
                  onChange={(e, { name, value }) => this.handleChange(name, value)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>

            <Button
              content='Save'
              onClick={this.handleSubmit}
              style={{ backgroundColor: '#6a6cff', color: '#ffffff' }} />
          </Modal.Actions>
        </Modal>

      </List.Content>
    )
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }
  handleSubmit = () => {
    const {
      studentInfo,
      emailVisibility,
      mobileNumberVisibility,
      roomNumberVisibility,
      bhawanVisibility } = this.state;
    const formData = new FormData()
    formData.append(
      'student',
      studentInfo.student
    )
    formData.append(
      'primary_email_id',
      emailVisibility
    )
    formData.append(
      'primary_mobile_no',
      mobileNumberVisibility
    )
    formData.append(
      'room_no',
      roomNumberVisibility
    )
    formData.append(
      'bhawan',
      bhawanVisibility
    )
    this.props.SetVisibility(
      this.props.match.params.id,
      formData,
      this.successCallback,
      this.errCallback
    )
  }
  successCallback = res => {
    this.setState({ open: false })
  }
  render() {
    const { studentInfo, facultyInfo } = this.state
    return (
      <Container styleName='blocks.content-div'>
        <center styleName='blocks.center'>
          <div>
            <Grid columns={2} divided>
              <Grid.Column width={5}>
                {(facultyInfo.length !== 0) && (studentInfo.length === 0) &&
                  <Card>
                    {facultyInfo.displayPicture ? (
                      < Image src={facultyInfo.displayPicture} />
                    ) : (
                        <DefaultDP
                          name={facultyInfo.name}
                          size='5em'
                        />
                      )}

                    <Card.Content>
                      <Card.Header>{facultyInfo.name}</Card.Header>
                      <Card.Meta>{facultyInfo.designation}</Card.Meta>
                      <Card.Description>{facultyInfo.department.name}</Card.Description>
                    </Card.Content>
                  </Card>
                }
                {(studentInfo.length !== 0) && (facultyInfo.length === 0) &&
                  <Card>
                    {studentInfo.displayPicture ? (
                      < Image src={studentInfo.displayPicture} />
                    ) : (
                        <DefaultDP
                          name={studentInfo.fullName}
                          size='5em'
                        />
                      )}
                    <Card.Content>
                      <Card.Header>{studentInfo.fullName}</Card.Header>
                      <Card.Meta>{studentInfo.enrolmentNumber}</Card.Meta>
                      <Card.Description>{studentInfo.branchName}</Card.Description>
                    </Card.Content>
                  </Card>
                }
              </Grid.Column>
              <Grid.Column width={9}>
                <Container styleName='blocks.info-box' >
                  <List verticalAlign='middle'>
                    <List.Item>

                      <List.Content>
                        <List.Header><List.Content floated='left'><h3 style={{ color: '#6a6cff' }}>About info</h3></List.Content></List.Header>
                        {(studentInfo.length !== 0) && (facultyInfo.length === 0) &&
                          <Container styleName='blocks.info-list'>
                            <List divided verticalAlign='middle'>
                              {studentInfo.emailAddress &&
                                <List.Item styleName='blocks.info-item'>
                                  {this.visibilityModal('emailVisibility')}
                                  <List.Content floated='left'>{studentInfo.emailAddress}</List.Content>
                                </List.Item>
                              }
                              {studentInfo.mobileNumber &&
                                <List.Item styleName='blocks.info-item'>
                                  {this.visibilityModal('mobileNumberVisibility')}
                                  <List.Content floated='left'>{studentInfo.mobileNumber}</List.Content>
                                </List.Item>
                              }
                              {studentInfo.roomNoInformation &&
                                <List.Item styleName='blocks.info-item'>
                                  {this.visibilityModal('roomNumberVisibility')}
                                  <List.Content floated='left'>{studentInfo.roomNoInformation}</List.Content>
                                </List.Item>
                              }
                              {studentInfo.bhawanInformation &&
                                <List.Item styleName='blocks.info-item'>
                                  {this.visibilityModal('bhawanVisibility')}
                                  <List.Content floated='left'>{studentInfo.bhawanInformation}</List.Content>
                                </List.Item>
                              }
                            </List>
                          </Container>
                        }
                        {(facultyInfo.length !== 0) && (studentInfo.length === 0) &&
                          <Container styleName='blocks.info-list'>
                            <List divided verticalAlign='middle'>
                              {facultyInfo.employeeId &&
                                <List.Item styleName='blocks.info-item'>
                                  <List.Content floated='right'><Icon name='users' /></List.Content>
                                  <List.Content floated='left'>{facultyInfo.employeeId}</List.Content>
                                </List.Item>
                              }
                              {facultyInfo.designation &&
                                <List.Item styleName='blocks.info-item'>
                                  <List.Content floated='right'><Icon name='users' /></List.Content>
                                  <List.Content floated='left'>{facultyInfo.designation}</List.Content>
                                </List.Item>
                              }
                              {facultyInfo.department &&
                                <List.Item styleName='blocks.info-item'>
                                  <List.Content floated='right'><Icon name='users' /></List.Content>
                                  <List.Content floated='left'>{facultyInfo.department.name}</List.Content>
                                </List.Item>
                              }
                            </List>
                          </Container>
                        }
                      </List.Content>

                    </List.Item>
                    {(studentInfo.length !== 0) &&
                      <List.Item>
                        <List.Content>
                          <List.Header><List.Content floated='left'><h3 style={{ color: '#6a6cff' }}>Interests</h3></List.Content></List.Header>

                          <Container styleName='blocks.info-list'>
                            <List divided verticalAlign='middle' style={{ maxHeight: 100, overflow: 'auto' }}>
                              {studentInfo.interests.map((item, i) => (
                                <List.Item styleName='blocks.info-item' key={i}><List.Content floated='left'>{item}</List.Content></List.Item>
                              )
                              )}
                            </List>
                          </Container>
                        </List.Content>

                      </List.Item>
                    }
                  </List>
                </Container>
              </Grid.Column>

            </Grid>
          </div >
        </center>
      </Container >
    )
  }
}
const mapStateToProps = state => {
  return {
    facultyProfile: state.facultyProfile,
    studentProfile: state.studentProfile,
    setVisibility: state.setVisibility
  }
}
const mapDispatchToProps = dispatch => {
  return {
    FacultyProfile: (id, successCallback, errCallback) => {
      dispatch(facultyProfile(id, successCallback, errCallback))
    },
    StudentProfile: (id, successCallback, errCallback) => {
      dispatch(studentProfile(id, successCallback, errCallback))
    },
    SetVisibility: (id, formData, successCallback, errCallback) => {
      dispatch(setVisibility(id, formData, successCallback, errCallback))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
