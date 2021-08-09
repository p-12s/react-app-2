import React, { useState } from 'react';

const Counter = function () {
  const [likes, setLikes] = useState(0)
  const [value, setValue] = useState('text text')

  function increment() {
    setLikes(likes + 1)
    setValue(value + likes)
  }

  function decrement () {
    setLikes(likes - 1)
    setValue(value + likes)
  }

  return (
    <>
      <h1>{likes}</h1>
      <h1>{value}</h1>
      <input 
        type="text" 
        value={value} 
        onChange={event => setValue(event.target.value)} // двустороннее связывание
      />
      <button onClick={increment}>++</button>
      <button onClick={decrement}>--</button>
    </>
  );
}

export default Counter;
