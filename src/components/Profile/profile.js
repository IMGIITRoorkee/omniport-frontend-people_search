import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Icon, Menu, Table, List, Button, Dropdown, Divider, Card, Segment, Grid, Image, Container } from 'semantic-ui-react'
import { DefaultDP } from 'formula_one'
import blocks from '../../css/app.css'


class Profile extends Component {
  state = {
    visibility: true
  }

  render() {
    return (
      <Container styleName='blocks.content-div'>
        <center styleName='blocks.center'>
          <div>
            <Grid columns={2} divided>
              <Grid.Column width={5}>
                <Card>
                  <DefaultDP
                    name="Full Name"
                    size='5em'
                  />
                  <Card.Content>
                    <Card.Header>Full Name</Card.Header>
                    <Card.Meta>Enrollment No</Card.Meta>
                    <Card.Description>Branch Year</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={9}>
                <Container styleName='blocks.info-box' >
                  <List verticalAlign='middle'>
                    <List.Item>
                      <List.Content>
                        <List.Header><List.Content floated='left'><h3 style={{ color: '#6a6cff' }}>About info</h3></List.Content></List.Header>
                        <Container styleName='blocks.info-list'>
                          <List divided verticalAlign='middle'>
                            <List.Item styleName='blocks.info-item'>
                              <List.Content floated='right'><Icon name='users' /></List.Content>
                              <List.Content floated='left'>Primary email id</List.Content>
                            </List.Item>
                            <List.Item styleName='blocks.info-item'>
                              <List.Content floated='right'><Icon name='users' /></List.Content>
                              <List.Content floated='left'>Contact no</List.Content>
                            </List.Item>
                            <List.Item styleName='blocks.info-item'>
                              <List.Content floated='right'><Icon name='users' /></List.Content>
                              <List.Content floated='left'>Room no</List.Content>
                            </List.Item>
                            <List.Item styleName='blocks.info-item'>
                              <List.Content floated='right'><Icon name='users' /></List.Content>
                              <List.Content floated='left'>Hostel</List.Content>
                            </List.Item>
                          </List>
                        </Container>
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header><List.Content floated='left'><h3 style={{ color: '#6a6cff' }}>Interests</h3></List.Content></List.Header>
                        <Container styleName='blocks.info-list'>
                          <List divided verticalAlign='middle'>
                            <List.Item styleName='blocks.info-item'><List.Content floated='left'>Design</List.Content></List.Item>
                            <List.Item styleName='blocks.info-item'><List.Content floated='left'>Volleyball</List.Content></List.Item>
                            <List.Item styleName='blocks.info-item'><List.Content floated='left'>Writing</List.Content></List.Item>
                          </List>
                        </Container>
                      </List.Content>
                    </List.Item>
                  </List>
                </Container>
              </Grid.Column>
            </Grid>
          </div >
        </center>
      </Container>
    )
  }
}
export default connect(
  null,
  null
)(Profile)
