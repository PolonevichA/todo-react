import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component{
  
  constructor() {
    super()

    this.state = {
      done: false,
      important: false,
    }

    this.onLabelClick = () => {
      this.setState(({ done }) => {
        return {
          done: !done,
        }
      })
    }
    this.onMarkImpotant = () => {
      this.setState(({important}) => {
        return {
          important: !important,
        }
      })
    }
  }

  render() {

    const { label } = this.props;
    const { done, important } = this.state;

    let className = 'todo-list-item';
    if(done){
      className += ' done';
    }
    if(important){
      className += ' important'
    }


  
    return (
      <span className={className}>
        <span
          className="todo-list-item-label"
          onClick = { this.onLabelClick }>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right" 
                onClick ={ this.onMarkImpotant }>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

