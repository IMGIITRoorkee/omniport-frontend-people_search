import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button, Loader, Label } from "semantic-ui-react";
import { debounce } from "lodash";
import { whoami } from "../../actions/getPerson";
import { urlProfile } from "../../urls";
import blocks from "../../css/app.css";
import StudentList from "./studentList";
import FacultyList from "./facultyList";
import Menus from "./menus";
import StudentOptionsComponent from "./studentOptions";
import FacultyOptionsComponent from "./facultyOptions";
import AllList from "./allList";
import Filters from "./filter";
import Pagination from "./pagination";
import { getStudentSearch } from "../../actions/studentSearch";
import { getfacultySearch } from "../../actions/facultySearch";
import { getfacultyOptions } from "../../actions/facultyOptions";
import { getstudentOptions } from "../../actions/studentOptions";

class Search extends Component {
  state = {
    query: "",
    branch: "",
    current_year: "",
    residence: "",
    designation: "",
    department: "",
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
    activeItem: "all",
    shouldScroll: 0,
    studentPage: 1,
    facultyPage: 1,
    studentTotalPages: 1,
    facultyTotalPages: 1,
    loading: false,
    active: true,
    categoryOptions: [],
    nameCategory: false,
    enrCategory: false,
    interestCategory: false,
    branchCategory: false,
    bhawanCategory: false,
  };

  onTabChange = () => {
    this.setState({ active: !this.state.active });
  };

  componentDidMount() {
    this.props.StudentOptions(
      this.successStudentOptionsCallback,
      this.errorCallback
    );
    this.props.FacultyOptions(
      this.successFacultyOptionsCallback,
      this.errorCallback
    );
    this.props.Whoami(this.successUserCheck, this.errorCallback);
  }
  successUserCheck = (res) => {
    if (res.data.roles[0].role === "Student") {
      this.setState({ studentRole: true });
    }
  };
  successStudentOptionsCallback = (res) => {
    const { data } = res;

    let residenceName = data.bhawanInformation;

    let residenceCode = data.bhawanCode;

    let residence = {};
    residenceName.forEach((key, i) => (residence[key] = residenceCode[i]));

    let year = ["1", "2", "3", "4", "5", "6", "7"];
    let branch = data.branchName;

    var residenceList = [];
    var yearList = [];

    var branchList = [];
    Object.keys(residence).forEach((key) => {
      residenceList.push({
        key: residence[key],
        text: key,
        value: residence[key],
      });
    });
    year.forEach(function (element) {
      yearList.push({ key: element, text: element, value: element });
    });

    branch.forEach(function (element) {
      branchList.push({ key: element, text: element, value: element });
    });

    this.setState({
      yearOptions: yearList,
      residenceOptions: [...new Set(residenceList)],
      branchOptions: [...new Set(branchList)],
    });
  };
  successFacultyOptionsCallback = (res) => {
    const { data } = res;
    let designationName = Object.keys(data.designation);

    let designationCode = Object.values(data.designation);

    let departmentName = Object.keys(data.department);
    let departmentCode = Object.values(data.department);

    let department = {};
    departmentName.forEach((key, i) => (department[key] = departmentCode[i]));

    let designation = {};
    designationName.forEach(
      (key, i) => (designation[key] = designationCode[i])
    );

    var designationList = [];
    var departmentsList = [];

    Object.keys(designation).forEach((key) => {
      designationList.push({
        key: designation[key],
        text: key,
        value: designation[key],
      });
    });
    Object.keys(department).forEach((key) => {
      departmentsList.push({
        key: department[key],
        text: key,
        value: department[key],
      });
    });
    this.setState({
      designationOptions: [...new Set(designationList)],
      departmentOptions: [...new Set(departmentsList)],
    });
  };
  studentSearch = (studentPage = 1) => {
    const { query, branch, current_year, residence, categoryOptions } =
      this.state;
    this.props.StudentSearch(
      query,
      branch,
      current_year,
      residence,
      categoryOptions,
      studentPage,
      this.successStudentResultsCallback
    );
  };

  facultySearch = (facultyPage = 1) => {
    const { query, designation, department } = this.state;
    this.props.FacultySearch(
      query,
      designation,
      department,
      facultyPage,
      this.successFacultyResultsCallback
    );
  };

  allSearch = async () => {
    const {
      query,
      designation,
      department,
      branch,
      current_year,
      residence,
      categoryOptions,
    } = this.state;

    let studentPage = 1;
    let facultyPage = 1;

    this.props.FacultySearch(
      query,
      designation,
      department,
      facultyPage,
      this.successFacultyResultsCallback
    );

    this.props.StudentSearch(
      query,
      branch,
      current_year,
      residence,
      categoryOptions,
      studentPage,
      this.successStudentResultsCallback
    );
  };

  successStudentResultsCallback = (response) => {
    this.setState((prevState) => ({
      loading: false,
      shouldScroll: prevState.shouldScroll + 1,
      studentresults: response.data.results,
      studentTotalPages: response.data.totalPages,
      studentPage: response.data.current,
    }));
  };

  successFacultyResultsCallback = (response) => {
    this.setState((prevState) => ({
      loading: false,
      shouldScroll: prevState.shouldScroll + 1,
      facultyresults: response.data.results,
      facultyTotalPages: response.data.totalPages,
      facultyPage: response.data.current,
    }));
  };
  hide = () => {
    if (this.state.hide === false) {
      this.setState({ hide: true });
    }
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
    if (this.search.value.length > -1) {
      this.setState({ loading: true });
      if (this.state.activeItem == "student") {
        this.hide();
        this.studentSearch();
      }
      if (this.state.activeItem == "faculty") {
        this.hide();
        this.facultySearch();
      }
      if (this.state.activeItem == "all") {
        this.hide();
        this.allSearch();
      }
    }
  };
  handleSubmit = () => {
    if (this.state.query.length > -1) {
      this.setState({ loading: true });
      if (this.state.activeItem == "student") {
        this.hide();
        this.studentSearch();
      }
      if (this.state.activeItem == "faculty") {
        this.hide();
        this.facultySearch();
      }
      if (this.state.activeItem == "all") {
        this.hide();
        this.allSearch();
      }
    }
  };

  handleCategorySubmit = (category) => {
    if (category === "name") {
      if (!this.state.nameCategory) {
        var joined = this.state.categoryOptions.concat("name");
        this.setState(
          {
            categoryOptions: joined,
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      if (this.state.nameCategory) {
        this.setState(
          {
            categoryOptions: this.state.categoryOptions.filter(function (obj) {
              return obj !== "name";
            }),
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      this.setState({
        nameCategory: !this.state.nameCategory,
      });
    }
    if (category === "enrollment") {
      if (!this.state.enrCategory) {
        var joined = this.state.categoryOptions.concat("enrollment");
        this.setState(
          {
            categoryOptions: joined,
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      if (this.state.enrCategory) {
        this.setState(
          {
            categoryOptions: this.state.categoryOptions.filter(function (obj) {
              return obj !== "enrollment";
            }),
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      this.setState({
        enrCategory: !this.state.enrCategory,
      });
    }
    if (category === "interest") {
      if (!this.state.interestCategory) {
        var joined = this.state.categoryOptions.concat("interest");
        this.setState(
          {
            categoryOptions: joined,
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      if (this.state.interestCategory) {
        this.setState(
          {
            categoryOptions: this.state.categoryOptions.filter(function (obj) {
              return obj !== "interest";
            }),
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      this.setState({
        interestCategory: !this.state.interestCategory,
      });
    }
    if (category === "branch") {
      if (!this.state.branchCategory) {
        var joined = this.state.categoryOptions.concat("branch");
        this.setState(
          {
            categoryOptions: joined,
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      if (this.state.branchCategory) {
        this.setState(
          {
            categoryOptions: this.state.categoryOptions.filter(function (obj) {
              return obj !== "branch";
            }),
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      this.setState({
        branchCategory: !this.state.branchCategory,
      });
    }
    if (category === "bhawan") {
      if (!this.state.bhawanCategory) {
        var joined = this.state.categoryOptions.concat("bhawan");
        this.setState(
          {
            categoryOptions: joined,
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      if (this.state.bhawanCategory) {
        this.setState(
          {
            categoryOptions: this.state.categoryOptions.filter(function (obj) {
              return obj !== "bhawan";
            }),
          },
          () => {
            this.hide();
            this.studentSearch();
          }
        );
      }
      this.setState({
        bhawanCategory: !this.state.bhawanCategory,
      });
    }
  };

  successStudentCallback = (res) => {
    this.setState({ studentresults: res.data.results });
  };
  successFacultyCallback = (res) => {
    this.setState({ facultyresults: res.data.results });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  profileDirect = () => {
    this.props.history.push({
      pathname: urlProfile(),
    });
  };

  handleDrop = () => {
    this.setState({ dropIndex: !this.state.dropIndex });
  };
  dropdownChange = (name, value) => {
    this.setState({ [name]: value });
  };
  onChangeFacultyPage = (p) => {
    this.setState({
      facultyPage: p,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldScroll != this.state.shouldScroll) {
      const element = document.getElementById("scrollTo");
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  render() {
    const {
      residenceOptions,
      yearOptions,
      branchOptions,
      designationOptions,
      departmentOptions,
      current_year,
      branch,
      residence,
      designation,
      department,
    } = this.state;
    return (
      <div styleName="blocks.content-div">
        <center styleName="blocks.center">
          <div styleName="blocks.heading">
            <span styleName="blocks.people"> People </span>
            <span styleName="blocks.search"> Search </span>
          </div>
          <div>
            <form onSubmit={this.submitHandler}>
              <input
                styleName="blocks.search-bar"
                placeholder="Search By Name, Enrollment Number, Interest, or Residence "
                ref={(input) => (this.search = input)}
                onChange={debounce(this.handleInputChange, 500)}
              />
            </form>

            <div styleName="blocks.advanced" onClick={this.handleDrop}>
              <span styleName="blocks.link"> Advanced Search </span>
              <Icon
                name={this.state.dropIndex ? "chevron up" : "chevron down"}
                link
                onClick={this.handleDrop}
                styleName="blocks.arrow"
              />
            </div>
            {this.state.dropIndex ? (
              <div styleName="blocks.advanced-all">
                <Menus
                  activeItem={this.state.activeItem}
                  handleItemClick={this.handleItemClick}
                />
                {this.state.activeItem == "student" ? (
                  <StudentOptionsComponent
                    yearOptions={yearOptions}
                    current_year={current_year}
                    branchOptions={branchOptions}
                    branch={branch}
                    residenceOptions={residenceOptions}
                    residence={residence}
                    dropdownChange={this.dropdownChange}
                  />
                ) : (
                  <></>
                )}
                {this.state.activeItem == "faculty" ? (
                  <FacultyOptionsComponent
                    designationOptions={designationOptions}
                    designation={designation}
                    departmentOptions={departmentOptions}
                    department={department}
                    dropdownChange={this.dropdownChange}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            <div styleName="blocks.category">
              <div styleName="blocks.category-container">
                {this.state.nameCategory ? (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("name")}
                    basic
                    circular
                    size={"large"}
                    style={{ color: "#6a6cff" }}
                    as="a"
                  >
                    Name
                    <Icon name="delete" />
                  </Label>
                ) : (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("name")}
                    basic
                    circular
                    size={"large"}
                    as="a"
                  >
                    Name
                  </Label>
                )}
                {this.state.enrCategory ? (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("enrollment")}
                    basic
                    circular
                    size={"large"}
                    style={{ color: "#6a6cff" }}
                    as="a"
                  >
                    Enrollment
                    <Icon name="delete" />
                  </Label>
                ) : (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("enrollment")}
                    basic
                    circular
                    size={"large"}
                    as="a"
                  >
                    Enrollment
                  </Label>
                )}
                {this.state.interestCategory ? (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("interest")}
                    basic
                    circular
                    size={"large"}
                    style={{ color: "#6a6cff" }}
                    as="a"
                  >
                    Interest
                    <Icon name="delete" />
                  </Label>
                ) : (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("interest")}
                    basic
                    circular
                    size={"large"}
                    as="a"
                  >
                    Interest
                  </Label>
                )}
                {this.state.branchCategory ? (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("branch")}
                    basic
                    circular
                    size={"large"}
                    style={{ color: "#6a6cff" }}
                    as="a"
                  >
                    Branch
                    <Icon name="delete" />
                  </Label>
                ) : (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("branch")}
                    basic
                    circular
                    size={"large"}
                    as="a"
                  >
                    Branch
                  </Label>
                )}
                {this.state.bhawanCategory ? (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("bhawan")}
                    basic
                    circular
                    size={"large"}
                    style={{ color: "#6a6cff" }}
                    as="a"
                  >
                    Bhawan
                    <Icon name="delete" />
                  </Label>
                ) : (
                  <Label
                    onClick={(e) => this.handleCategorySubmit("bhawan")}
                    basic
                    circular
                    size={"large"}
                    as="a"
                  >
                    Bhawan
                  </Label>
                )}
              </div>
            </div>
            <div styleName="blocks.submit-menu">
              <Button
                onClick={this.handleSubmit}
                styleName="blocks.icon-button"
                style={{ backgroundColor: "#6a6cff", color: "#ffffff" }}
              >
                {this.state.loading ? (
                  <Loader inline inverted active />
                ) : (
                  "Search"
                )}
              </Button>
              {this.state.studentRole && (
                <Button
                  secondary
                  onClick={(e) => this.profileDirect()}
                  styleName="blocks.icon-button"
                  style={{ backgroundColor: "#303030", color: "#ffffff" }}
                >
                  Edit Visibility
                </Button>
              )}
            </div>
            <div id="scrollTo"></div>
            {this.state.hide === true &&
              this.state.activeItem === "student" && (
                <StudentList
                  history={this.props.history}
                  showHead={false}
                  studentresults={this.state.studentresults}
                />
              )}

            {this.state.hide === true &&
              this.state.activeItem === "faculty" && (
                <FacultyList
                  showHead={false}
                  facultyresults={this.state.facultyresults}
                />
              )}

            {this.state.hide === true && this.state.activeItem === "all" && (
              <>
                <Filters
                  yearOptions={yearOptions}
                  current_year={current_year}
                  branch={branch}
                  branchOptions={branchOptions}
                  residence={residence}
                  residenceOptions={residenceOptions}
                  designationOptions={designationOptions}
                  designation={designation}
                  department={department}
                  departmentOptions={departmentOptions}
                />
                <AllList
                  onChange={this.onTabChange}
                  active={this.state.active}
                  studentresults={this.state.studentresults}
                  facultyresults={this.state.facultyresults}
                  history={this.props.history}
                />
              </>
            )}
            {this.state.hide === true &&
              (this.state.activeItem === "student" ||
                (this.state.activeItem === "all" && this.state.active)) && (
                <Pagination
                  pageNumber={this.state.studentPage}
                  totalPages={this.state.studentTotalPages}
                  onChangePage={(p) => this.studentSearch(p)}
                />
              )}
            {this.state.hide === true &&
              (this.state.activeItem === "faculty" ||
                (this.state.activeItem === "all" && !this.state.active)) && (
                <Pagination
                  pageNumber={this.state.facultyPage}
                  totalPages={this.state.facultyTotalPages}
                  onChangePage={(p) => this.facultySearch(p)}
                />
              )}
          </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    studentOptions: state.studentOptions,
    facultyOptions: state.facultyOptions,
    whoami: state.whoami,
    studentSearch: state.studentSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    StudentOptions: (successCallback, errCallback) => {
      dispatch(getstudentOptions(successCallback, errCallback));
    },
    FacultyOptions: (successCallback, errCallback) => {
      dispatch(getfacultyOptions(successCallback, errCallback));
    },
    Whoami: (successCallback, errCallback) => {
      dispatch(whoami(successCallback, errCallback));
    },
    StudentSearch: (
      query,
      branch,
      current_year,
      residence,
      categoryOptions,
      studentPage,
      successStudentResultsCallback
    ) => {
      dispatch(
        getStudentSearch(
          query,
          branch,
          current_year,
          residence,
          categoryOptions,
          studentPage,
          successStudentResultsCallback
        )
      );
    },
    FacultySearch: (
      query,
      designation,
      department,
      facultyPage,
      successFacultyResultsCallback
    ) => {
      dispatch(
        getfacultySearch(
          query,
          designation,
          department,
          facultyPage,
          successFacultyResultsCallback
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
