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
      term: '',
      filter: 'all',
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

    this.search = (items, term) => {
      if(term.length === 0) {
        return items;
      }

      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    }

    this.onSearchChange = (term) => {
      this.setState({ term })
    }

    this.filter = (items, filter) => {
      console.log(filter)
      switch(filter){
        case 'all':
          return items;
        case 'active': 
          return items.filter(item => {
            return !item.done
          })
        case 'done':
          return items.filter(item => item.done)
        default:
          return items
      }
    }
  }

  

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItem = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter(elem => elem.done).length;
    const doCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={doCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange ={this.onSearchChange}/>
          <ItemStatusFilter />
        </div>
  
        <TodoList 
        todos={visibleItem}  
        onDeleted = {this.deleteItem}
        onToggleDone = {this.onToggleDone}
        onToggleImportant = {this.onToggleImportant}
        />

        <ItemAddForm addItem = {this.addItem} />
      </div>
    );
  }
}

