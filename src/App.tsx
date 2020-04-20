import React from 'react';
import User from './components/User'
import './App.scss';
import {Button} from 'antd'


function App() {
  return (
    <div className="App">
      <User/>
      <header className="App-header">
        <Button type="primary">button</Button>
      </header>
    </div>
  );
}

export default App;
