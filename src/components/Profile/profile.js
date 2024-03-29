import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Icon,
  List,
  Button,
  Form,
  Modal,
  Card,
  Checkbox,
  Grid,
  Image,
  Container,
} from "semantic-ui-react";

import { DefaultDP } from "formula_one";
import { getStudentProfile } from "../../actions/profile";
import { setVisibilityPut } from "../../actions/setVisibility";

import blocks from "../../css/profile.css";

class Profile extends Component {
  state = {
    studentInfo: [],
    emailVisibility: [],
    mobileNumberVisibility: [],
    roomNumberVisibility: [],
    bhawanVisibility: [],
    name: "",
    error: false,
    open: false,
  };
  componentDidMount() {
    this.props.StudentProfile(
      this.successStudentCallback,
      this.errStudentCallback
    );
  }
  successStudentCallback = (res) => {
    this.setState({
      studentInfo: res.data,
      emailVisibility: res.data.primaryEmailId,
      mobileNumberVisibility: res.data.primaryMobileNo,
      roomNumberVisibility: res.data.roomNo,
      bhawanVisibility: res.data.bhawan,
    });
  };
  errStudentCallback = (err) => {
    this.setState({ error: true });
  };
  showModal = (name) => {
    this.setState({ open: true, name: name });
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  visibilityModal = () => {
    return (
      <Modal
        open={this.state.open}
        onClose={this.closeModal}
        size="tiny"
        closeIcon
      >
        <Modal.Header>
          <h3 style={{ color: "#6a6cff" }}>Show To</h3>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Checkbox
                label="Students"
                name={this.state.name}
                value="std"
                disabled={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("non")
                }
                checked={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("std")
                }
                onChange={(e, { name, value }) =>
                  this.handleChange(name, value)
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Faculty"
                name={this.state.name}
                value="fac"
                disabled={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("non")
                }
                checked={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("fac")
                }
                onChange={(e, { name, value }) =>
                  this.handleChange(name, value)
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Branch"
                name={this.state.name}
                value="brn"
                disabled={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("non")
                }
                checked={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("brn")
                }
                onChange={(e, { name, value }) =>
                  this.handleChange(name, value)
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Bhawan"
                name={this.state.name}
                value="bhw"
                disabled={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("non")
                }
                checked={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("bhw")
                }
                onChange={(e, { name, value }) =>
                  this.handleChange(name, value)
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="None"
                name={this.state.name}
                value="non"
                checked={
                  this.state[this.state.name] &&
                  this.state[this.state.name].includes("non")
                }
                onChange={(e, { name, value }) =>
                  this.handleChange(name, value)
                }
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Save"
            onClick={this.handleSubmit}
            style={{ backgroundColor: "#6a6cff", color: "#ffffff" }}
          />
        </Modal.Actions>
      </Modal>
    );
  };
  handleChange = (name, value) => {
    if (this.state[this.state.name].includes(value)) {
      this.setState({
        [name]: this.state[this.state.name].filter(function (obj) {
          return obj !== value;
        }),
      });
    } else {
      if (value == "non") {
        this.setState(() => ({
          [name]: [value],
        }));
      } else if (!this.state[this.state.name].includes("non")) {
        this.setState((prevState) => ({
          [name]: [...prevState[prevState.name], value],
        }));
      }
    }
  };
  handleSubmit = () => {
    const {
      studentInfo,
      emailVisibility,
      mobileNumberVisibility,
      roomNumberVisibility,
      bhawanVisibility,
    } = this.state;
    const formData = new FormData();
    formData.append("student", studentInfo.student);
    let filteredEmailVisibilty = emailVisibility.filter((item) => item !== "");
    let filteredMobileNumberVisibilty = mobileNumberVisibility.filter(
      (item) => item !== ""
    );
    let filteredRoomNumberVisibilty = roomNumberVisibility.filter(
      (item) => item !== ""
    );
    let filteredbhawanVisibilty = bhawanVisibility.filter(
      (item) => item !== ""
    );

    if (filteredEmailVisibilty.length > 0) {
      for (var i = 0; i < filteredEmailVisibilty.length; i++)
        formData.append("primary_email_id", filteredEmailVisibilty[i]);
    } else {
      formData.append("primary_email_id", []);
    }

    if (filteredMobileNumberVisibilty.length > 0) {
      for (var i = 0; i < filteredMobileNumberVisibilty.length; i++)
        formData.append("primary_mobile_no", filteredMobileNumberVisibilty[i]);
    } else {
      formData.append("primary_mobile_no", []);
    }

    if (filteredRoomNumberVisibilty.length > 0) {
      for (var i = 0; i < filteredRoomNumberVisibilty.length; i++)
        formData.append("room_no", filteredRoomNumberVisibilty[i]);
    } else {
      formData.append("room_no", []);
    }

    if (filteredbhawanVisibilty.length > 0) {
      for (var i = 0; i < filteredbhawanVisibilty.length; i++)
        formData.append("bhawan", filteredbhawanVisibilty[i]);
    } else {
      formData.append("bhawan", []);
    }
    this.props.SetVisibility(formData, this.successCallback, this.errCallback);
  };
  successCallback = (res) => {
    this.setState({ open: false });
  };
  errCallback = (res) => {
    this.setState({ open: false });
  };
  render() {
    const { studentInfo } = this.state;
    return (
      <div styleName="blocks.content-div">
        <div styleName="blocks.profile-div">
          <div styleName="blocks.picture">
            {studentInfo.length !== 0 && (
              <Card>
                {studentInfo.displayPicture ? (
                  <Image src={studentInfo.displayPicture} />
                ) : (
                  <DefaultDP name={studentInfo.fullName} size="5em" />
                )}
                <Card.Content>
                  <Card.Header>{studentInfo.fullName}</Card.Header>
                  <Card.Meta>{studentInfo.enrolmentNumber}</Card.Meta>
                  <Card.Description styleName="blocks.branch-text">
                    {studentInfo.branchName}
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
          </div>
          <div styleName="blocks.info-box">
            <List verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header>
                    <List.Content floated="left">
                      <h3 style={{ color: "#6a6cff" }}>About info</h3>
                    </List.Content>
                  </List.Header>
                  {studentInfo.length !== 0 && (
                    <Container styleName="blocks.info-list">
                      <List divided verticalAlign="middle">
                        {studentInfo.emailAddress && (
                          <List.Item styleName="blocks.info-item">
                            <List.Content
                              floated="right"
                              styleName="blocks.info-text"
                            >
                              <Icon
                                link
                                name="users"
                                onClick={(e) =>
                                  this.showModal("emailVisibility")
                                }
                              />
                            </List.Content>

                            <List.Content
                              floated="left"
                              styleName="blocks.info-text"
                            >
                              {studentInfo.emailAddress}
                            </List.Content>
                          </List.Item>
                        )}
                        {studentInfo.mobileNumber && (
                          <List.Item styleName="blocks.info-item">
                            <List.Content
                              floated="right"
                              styleName="blocks.info-text"
                            >
                              <Icon
                                link
                                name="users"
                                onClick={(e) =>
                                  this.showModal("mobileNumberVisibility")
                                }
                              />
                            </List.Content>
                            <List.Content
                              floated="left"
                              styleName="blocks.info-text"
                            >
                              {studentInfo.mobileNumber}
                            </List.Content>
                          </List.Item>
                        )}
                        {studentInfo.roomNoInformation && (
                          <List.Item styleName="blocks.info-item">
                            <List.Content
                              floated="right"
                              styleName="blocks.info-text"
                            >
                              <Icon
                                link
                                name="users"
                                onClick={(e) =>
                                  this.showModal("roomNumberVisibility")
                                }
                              />
                            </List.Content>
                            <List.Content
                              floated="left"
                              styleName="blocks.info-text"
                            >
                              {studentInfo.roomNoInformation}
                            </List.Content>
                          </List.Item>
                        )}
                        {studentInfo.bhawanInformation && (
                          <List.Item styleName="blocks.info-item">
                            <List.Content
                              floated="right"
                              styleName="blocks.info-text"
                            >
                              <Icon
                                link
                                name="users"
                                onClick={(e) =>
                                  this.showModal("bhawanVisibility")
                                }
                              />
                            </List.Content>
                            <List.Content
                              floated="left"
                              styleName="blocks.info-text"
                            >
                              {studentInfo.bhawanInformation}
                            </List.Content>
                          </List.Item>
                        )}
                      </List>
                      {this.visibilityModal()}
                    </Container>
                  )}
                </List.Content>
              </List.Item>
              {studentInfo.length !== 0 && (
                <List.Item>
                  <List.Content>
                    <List.Header>
                      <List.Content
                        floated="right"
                        styleName="blocks.info-text blocks.edit-interest"
                      >
                        <Icon
                          link
                          name="edit"
                          onClick={(e) =>
                            this.props.history.push({
                              pathname: `/student_profile/`,
                            })
                          }
                        />
                      </List.Content>
                      <List.Content floated="left">
                        <h3 style={{ color: "#6a6cff" }}>Interests</h3>
                      </List.Content>
                    </List.Header>
                    {studentInfo.interests && (
                      <Container styleName="blocks.info-list">
                        <List divided verticalAlign="middle">
                          {studentInfo.interests.map((item, i) => (
                            <List.Item styleName="blocks.info-item" key={i}>
                              <List.Content floated="left">{item}</List.Content>
                            </List.Item>
                          ))}
                        </List>
                      </Container>
                    )}
                  </List.Content>
                </List.Item>
              )}
            </List>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
    setVisibility: state.setVisibility,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    StudentProfile: (successCallback, errCallback) => {
      dispatch(getStudentProfile(successCallback, errCallback));
    },
    SetVisibility: (formData, successCallback, errCallback) => {
      dispatch(setVisibilityPut(formData, successCallback, errCallback));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
