import React, { Component } from "react";
import blocks from "../../css/app.css";

class FacultyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.showHead && (
          <div styleName="blocks.search-title-heading"> Faculty </div>
        )}
        {this.props.facultyresults.length ? (
          this.props.facultyresults.map((x) => (
            <div styleName="blocks.result-segment" style={{ maxWidth: "74%" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  styleName="blocks.result-item"
                  style={{ color: "#6a6cff", width: "90px" }}
                >
                  {x.person.fullName}
                </div>
                <div styleName="blocks.result-item" style={{ width: "370px" }}>
                  {x.department.name}
                </div>
                <div styleName="blocks.result-item" style={{ width: "222px" }}>
                  {x.person.roles[0].data.designation}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div styleName="blocks.no-match">
            There is no faculty matching your query
          </div>
        )}
      </div>
    );
  }
}

export default FacultyList;
