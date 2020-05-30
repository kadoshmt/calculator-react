import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const DisplayContainer = ({display}) => (
  <div className="display-container"> { display } </div>
)

const InputKey = ({ character, styles="", func }) => (
  <button className={`input-key ${styles}`} onClick={()=>func(character)}>
    { character }
  </button>
)

export default function App() {
  const [state, setState] = useState({
    display: '0',    
    prev: 0,
    next: null,
    operator: '',
    resetDisplay: false,
    log: false,
  })

  function executeOperation( prev, next ) {
    switch (state.operator) {
      case '-': return Number(prev) - Number(next)
      case '/': return Number(prev) / Number(next)
      case '+': return Number(prev) + Number(next)
      default: return 0;  
    }    
  }   

  function clear() {
    setState(state => ({
      ...state,
      display: '0',
      next: null,
      resetDisplay: false
    }))
  }

  function clearAll() {
    setState(state => ({
      ...state, 
      display: '0',
      prev: 0,
      next: null,
      operator: '',
      resetDisplay: false
    }))
  }

  function handlerDigit( value ){    
    // the display always have to show a number, and when 0, only one 0
    const trimZero = state.display === '0' ? '' : state.display
    
    // avoid the user enter more than 8 digits
    let newValue = state.display.length < 8 ? `${trimZero}${value}` : `${trimZero}`

    // when user press an operator, the display needs to be clean to show the next number(s)
    if (state.resetDisplay){
      state.resetDisplay = !state.resetDisplay
      newValue = `${value}`
    }

    setState(state => ({
      ...state,
      display: String(newValue),
      next: Number(newValue)
    }))
  }

  function handlerOperator(operator){
    let newPrev = state.prev
    let newNext = state.next

    switch (operator) {
      case '=':
        // if division by zero should be throw an error
        if(state.next === 0 && state.operator === '/'){
          setState(state => ({
            ...state,
            display: 'zero_err',
            next: null,
          }))
          return
        }

        // if user don't inform next, use [prev] [operator] [prev]
        newNext = state.next === null ? state.prev : state.next

        const result = executeOperation(newPrev, newNext)

        setState(state => ({
          ...state,
          display: String(result),
          prev: result,
          next: newNext,
        }))
        return

      default:
        // reset next value
        newNext = state.next !== null ? null : state.next

        setState(state => ({
          ...state,
          resetDisplay: true,
          prev: Number(state.display),
          next: newNext,
          operator
        }))
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
          <InputKey character="C" styles="dark-gray" func={clear}/>
          <InputKey character="AC" styles="dark-gray" func={clearAll}/>
          <InputKey character="=" styles="orange" func={handlerOperator}/>
        </div>
      </div>
      {state.log && 
        <div className="consoleLog">
          {`Prev: ${state.prev}, Next: ${state.next}, Operator: '${state.operator}'`}
        </div>}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
