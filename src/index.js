import React from 'react';
import ReactDOM from 'react-dom';

import SearchPanel from './components/search-panel';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';



const App = () => {
  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));