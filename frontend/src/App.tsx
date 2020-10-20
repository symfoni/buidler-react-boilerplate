import React from 'react';
import './App.css';
import { BuidlerContext } from "./buidler/BuidlerContext";
import { Greeter } from './components/Greeter';
import { MyToken } from './components/MyToken';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BuidlerContext>
          <MyToken></MyToken>
          <Greeter></Greeter>
        </BuidlerContext>
      </header>
    </div>
  );
}

export default App;
