import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const DisplayContainer = ({display='0'}) => (  
    <div className="display-container">
      {display}
    </div>
  )

const InputKey = ({ character, styles="", func }) => (
  <button className={`input-key ${styles}`} onClick={()=>func(character)}>
    {character}
  </button>
)

export default function App() {  
  const [display, setDisplay] = useState('0')
  const [preValue, setPreValue] = useState('')
  const [nextValue, setNextValue] = useState('')
  const [operator, setOperator] = useState('')
  let firstPosition = true;  
  
  function consoleLog(msg){
    console.log(`${msg} || Display: ${display}, Operator: ${operator}, Prev: ${preValue}, Next: ${nextValue}, first: ${firstPosition}`)
  }
  function executeOperation(preValue, nextValue){        
    switch (operator) {
      case '+': return preValue + nextValue
      case '-': return preValue - nextValue
      case '/': return preValue / nextValue    
      default: return 0;  
    }
    
  }   
  
  function clear(){
    setNextValue('')
  }

  function clearAll(){
    setNextValue('')
    setOperator('')
    setPreValue('')
    firstPosition = true
  }

  function handlerDigit( value ){          
    //setDigit(value)        
    display.length < 8 
      ? display === '0' // In the first time, display will be always 0...
        ? setDisplay (value)  // so, change the value for the clicked value
        : setDisplay(`${display}${value}`) // after that, concat the value with the previous
      : console.log('Do nothing')
    consoleLog('handlerDigit')
  }

  function handlerOperator(operator){    
    consoleLog('handlerOperator')
    setOperator(operator)        
    //setDisplay('0') // trocar pelo valor do display antes de clicar no sinal
  }

  function handlerEqual(){
    consoleLog('handlerEqual')
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
    consoleLog('useEffect nextValue')
    if(operator !== '') {
      const result = executeOperation(preValue, nextValue)
      setPreValue(result)
      setDisplay(result + '')   
      } 
  }, [nextValue])

  useEffect(() => {
    consoleLog('useEffect operator')
    if(operator !== '') {
      console.log('setou preValue')
      if (firstPosition ) {
        setPreValue(Number.parseInt(display))
        firstPosition = false
      } else {
        setNextValue(Number.parseInt(display))
      }
      consoleLog('useEffect operator inside if')
      //setDisplay('0')
    }
  }, [operator])

  /*
  useEffect(() => {        
    display.length <= 8 
      ? display === '0' // In the first time, display will be always 0...
        ? setDisplay (digit)  // so, change the value for the clicked value
        : setDisplay(`${display}${digit}`) // after that, concat the value with the previous
      : console.log('Do nothing')
  }, [digit])
  */
  
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
