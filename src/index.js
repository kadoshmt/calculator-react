import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const DisplayContainer = ({display}) => (  
    <div className="display-container">
      {
        display.length < 8 ?
          display :
          display.slice(0, 5).concat('...')
      }
    </div>
  )

const InputKey = ({ character, styles="", func }) => (
  <button className={`input-key ${styles}`} onClick={()=>func(character)}>
    {character}
  </button>
)

export default function App() {
  const [state, setState] = useState({
    display: '0',
    prev: '0',
  })
  
  function clear(){
    setState(state => ({
      ...state,
      display: '0',
    }))
  }

  function clearAll(){
    setState(state => ({
      ...state,
      display: '0',
      prev: '0',
    }))
  }

  function handlerDigit( value ){          
    const trimZero = state.display === '0' ? '' : state.display
    setState(state => ({
      ...state,
      display: `${trimZero}${value}`,
    }))
  }

  function handlerOperator(operator){
    switch (operator) {
      case '+':
        setState(state => ({
          ...state,
          display: '0',
          prev: String(Number(state.prev) + Number(state.display)),
        }))
        return
      case '=':
        setState(state => ({
          ...state,
          display: state.prev,
          prev: '0',
        }))
        return
      default:
        return
    }
  }

  
  return (   
    <div className="container">       
      <div className="calculator">
        <DisplayContainer display={state.display} />
        <div className="keypad">
          <InputKey character="7" styles="light-gray" func={handlerDigit} />
          <InputKey character="8" styles="light-gray" func={handlerDigit} />
          <InputKey character="9" styles="light-gray" func={handlerDigit} />
          <InputKey character="/" styles="orange" func={handlerOperator} />
          <InputKey character="4" styles="light-gray" func={handlerDigit} />
          <InputKey character="5" styles="light-gray" func={handlerDigit} />
          <InputKey character="6" styles="light-gray" func={handlerDigit} />
          <InputKey character="-" styles="orange" func={handlerOperator}/>
          <InputKey character="1" styles="light-gray" func={handlerDigit} />
          <InputKey character="2" styles="light-gray" func={handlerDigit} />
          <InputKey character="3" styles="light-gray" func={handlerDigit} />
          <InputKey character="+" styles="orange" func={handlerOperator}/>
          <InputKey character="0" styles="light-gray" func={handlerDigit} />
          <InputKey character="C" styles="light-gray" func={clear}/>
          <InputKey character="AC" styles="light-gray" func={clearAll}/>
          <InputKey character="=" styles="orange" func={handlerOperator}/>
        </div>
      </div>      
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);