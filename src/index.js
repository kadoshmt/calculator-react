import React, { useState, useEffect } from 'react';
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
  const [digit, setDigit] = useState('0')
  const [display, setDisplay] = useState('0')
  const [preValue, setPreValue] = useState('')
  const [nextValue, setNextValue] = useState('')
  const [operator, setOperator] = useState('')
  const [history, setHistory] = []
  
  function executeOperation(preValue, nextValue){    
    console.log(preValue ,nextValue, operator, display)
    switch (operator) {
      case '+': return preValue + nextValue
      case '-': return preValue - nextValue
      case '/': return preValue / nextValue      
    }
    return 0
  }   
  
  function clear(){
    setNextValue('')
  }

  function clearAll(){
    setNextValue('')
    setOperator('')
    setPreValue('')
  }

  function handlerDigit( value ){          
    const trimZero = display === '0' ? '' : display
    setDisplay(`${trimZero}${value}`)
  }

  function handlerOperator(operator){    
    setOperator(operator)    
    preValue === '' ? setPreValue(Number.parseInt(display)) : setNextValue(Number.parseInt(display))
  }

  function handlerEqual(){   
    console.log(preValue ,nextValue, operator, display)

    // If the user press equal without inform any number
    if(preValue === '' && nextValue === '') {
      console.log('valores zerados')      
      return
    }

    // If the calc is a division by zero
    if(operator === '/' && display === '0'){
      setDisplay('ZERO ERR')      
      console.log('divisão por zero')
      return
    }    

    nextValue === '' ? setNextValue(Number.parseInt(display)) : setNextValue(Number.parseInt(display))

  }

  useEffect(() => {
    const result = executeOperation(preValue, nextValue)
    setDisplay(result + '')
  }, [nextValue])
  
  return (   
    <div className="container">       
      <div className="calculator">
        <DisplayContainer display={display} />
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
          <InputKey character="=" styles="orange" func={handlerEqual}/>
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