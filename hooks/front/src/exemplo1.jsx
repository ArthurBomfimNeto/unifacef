import React, {useState} from 'react'
function Exemplo1() {
  const [contador, setContador] = useState(0);
  
return (
  <div> 
    Valor do contador {contador} 
    <button type="button" onClick={ () => setContador(contador+1)}> Aumenta contador </button> 
  </div>) 
} 

export default Exemplo1;
