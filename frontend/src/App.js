// CÓDIGO COMENTADO PARA ESTUDO...
//import React, {useState} from 'react';

// import Header from './Header';

// function App() {
//   //UTILIZANDO O CONCEITO DE ESTADO
//     //ARRAY [VALOR, funcaoDeAtualizacao]
//   const [counter, setCounter] = useState(0);

//   function increment(){
//     setCounter(counter + 1);

//   }
//   return (
//     <div>
//       <Header>Contador: { counter }</Header>
//       <button onClick={ increment }>Incrementar</button>
//     </div>
//   );
// }
//CÓDIGO COMENTADO PARA ESTUDO
// ==========================================================================//

import React from 'react';
import './global.css';

import Routes from './routes';

function App(){

  return(
    <Routes />
  );
}

export default App;
