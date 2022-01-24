import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

import blocks from "../../css/app.css";

class Menus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeItem, handleItemClick } = this.props;
    return (
      <Menu styleName="blocks.menu">
        <Menu.Item
          as="Button"
          name="all"
          active={activeItem === "all"}
          styleName={
            activeItem != "all" ? "blocks.menu-item" : "blocks.menu-item-color"
          }
          onClick={handleItemClick}
        >
          All
        </Menu.Item>
        <Menu.Item
          as="Button"
          styleName={
            activeItem != "student"
              ? "blocks.menu-item"
              : "blocks.menu-item-color"
          }
          name="student"
          active={activeItem === "student"}
          onClick={handleItemClick}
        >
          Student
        </Menu.Item>
        <Menu.Item
          as="Button"
          styleName={
            activeItem != "faculty"
              ? "blocks.menu-item"
              : "blocks.menu-item-color"
          }
          name="faculty"
          active={activeItem === "faculty"}
          onClick={handleItemClick}
        >
          Faculty
        </Menu.Item>
      </Menu>
    );
  }
}

export default Menus;
