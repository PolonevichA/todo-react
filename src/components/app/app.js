import React, { Component } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{

  constructor(){
    super()
    this.maxId = 100;

    this.createNewItem = (label) =>{
      return {
        label,
        done: false,
        important: false,
        id: this.maxId++
      }
    }

    this.state = {
      todoData: [
        this.createNewItem('Drink coffee'),
        this.createNewItem('Make Awesome App'),
        this.createNewItem('Have a lunch')
      ],
    }

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ]

        return {
          todoData: newArray,
        }
      })
    }

    this.addItem = (text) => {
      this.setState(({ todoData }) => {
        const newItem = this.createNewItem(text)

        const newArray = [
          ...todoData,
          newItem,
        ]

        return {
          todoData: newArray,
        }
      })
    }

    this.toggleProperty = (arr, id, nameProp) => {
      const idx = arr.findIndex((el) => el.id === id);
        
        const oldItem = arr[idx];
        const newItem = {
          ...oldItem,
          [nameProp]: !oldItem[nameProp],
        }

         return [
          ...arr.slice(0, idx),
          newItem,
          ...arr.slice(idx + 1)
        ]
    }

    this.onToggleDone = (id) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
      })
    }

    this.onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      })
    }
  }

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter(elem => elem.done).length;
    const doCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={doCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
        todos={todoData}  
        onDeleted = {this.deleteItem}
        onToggleDone = {this.onToggleDone}
        onToggleImportant = {this.onToggleImportant}
        />

        <ItemAddForm addItem = {this.addItem} />
      </div>
    );
  }
}

