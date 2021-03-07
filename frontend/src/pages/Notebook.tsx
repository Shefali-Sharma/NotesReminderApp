import React, { SyntheticEvent, useState, Component } from 'react';
import { Label, Menu } from 'semantic-ui-react'

export default class Notebook extends Component {
    state = { activeItem: 'inbox' }
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu vertical>
          <Menu.Item
            name='inbox'
            active={activeItem === 'inbox'}
            onClick={(name) => {
                this.setState({activeItem: name})
            }}
          >
            <Label color='teal'>1</Label>
            Inbox
          </Menu.Item>
  
          <Menu.Item
            name='spam'
            active={activeItem === 'spam'}
            onClick={(name) => {
                this.setState({activeItem: name})
            }}
          >
            <Label>51</Label>
            Spam
          </Menu.Item>
  
          <Menu.Item
            name='updates'
            active={activeItem === 'updates'}
            onClick={(name) => {
                this.setState({activeItem: name})
            }}
          >
            <Label>1</Label>
            Updates
          </Menu.Item>
        </Menu>
      )
    }
  }