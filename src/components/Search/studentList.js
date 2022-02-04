import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

import blocks from "../../css/app.css";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
  }

  studentHomepage = (id) => {
    const win = window.open(`/student_profile/${id}/`, "_blank");
    win.focus();
  };

  render() {
    return (
      <div styleName="blocks.student-div">
        {this.props.showHead && (
          <div styleName="blocks.search-title-heading"> Students </div>
        )}
        {this.props.studentresults.length ? (
          this.props.studentresults.map((x) => (
            <div styleName="blocks.result-segment">
              <Accordion>
                <Accordion.Title
                  active={this.state.activeIndex === x.enrolmentNumber}
                  index={0}
                  style={{ padding: "0" }}
                  onClick={() =>
                    this.state.activeIndex !== x.enrolmentNumber
                      ? this.setState({ activeIndex: x.enrolmentNumber })
                      : this.setState({ activeIndex: -1 })
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      styleName="blocks.result-item"
                      style={{
                        display: "flex",
                        color: "#6a6cff",
                        width: "120px",
                      }}
                    >
                      {window.innerWidth <= 991 && x.interests.length !== 0 && (
                        <Icon name="dropdown" color="black" />
                      )}

                      <a
                        onClick={() => this.studentHomepage(x.enrolmentNumber)}
                        style={{ cursor: "pointer" }}
                      >
                        {x.fullName}
                      </a>
                    </div>
                    <div
                      styleName="blocks.result-item"
                      style={{ width: "108px" }}
                    >
                      {x.enrolmentNumber}
                    </div>
                    <div
                      styleName="blocks.result-item"
                      style={{ width: "285px" }}
                    >
                      {x.branchName}
                    </div>
                    {x.currentYear == 3 ? (
                      <div
                        styleName="blocks.result-item"
                        style={{ width: "69px" }}
                      >
                        {x.currentYear}
                        {"rd"}
                      </div>
                    ) : x.currentYear == 2 ? (
                      <div
                        styleName="blocks.result-item"
                        style={{ width: "69px" }}
                      >
                        {x.currentYear}
                        {"nd"}
                      </div>
                    ) : x.currentYear == 1 ? (
                      <div
                        styleName="blocks.result-item"
                        style={{ width: "69px" }}
                      >
                        {x.currentYear}
                        {"st"}
                      </div>
                    ) : (
                      <div
                        styleName="blocks.result-item"
                        style={{ width: "69px" }}
                      >
                        {x.currentYear}
                        {"th"}
                      </div>
                    )}
                    <div
                      styleName="blocks.result-item"
                      style={{ width: "210px" }}
                    >
                      {x.emailAddress}
                    </div>
                    <div
                      styleName="blocks.result-item"
                      style={{ width: "130px" }}
                    >
                      {x.mobileNumber}
                    </div>
                    <div
                      styleName="blocks.result-item"
                      style={{ width: "180px" }}
                    >
                      {x.roomNoInformation}
                      {"  "}
                      {x.bhawanInformation}
                    </div>
                  </div>
                </Accordion.Title>
              </Accordion>
              {x.interests.length !== 0 &&
                (this.state.activeIndex === x.enrolmentNumber ||
                  window.innerWidth > 991) && (
                  <div
                    styleName="blocks.filters"
                    style={{ marginBottom: "0px", width: "100%" }}
                  >
                    {x.interests.map((item, i) => (
                      <div styleName="blocks.filter-item blocks.filter-item-student">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))
        ) : (
          <div styleName="blocks.no-match">
            There are no students matching your query
          </div>
        )}
      </div>
    );
  }
}

export default StudentList;
