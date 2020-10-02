import React from 'react';

//INJETANDO PROPRIEDADE JS.
export default function Header({ children }){
    return(
        <header>
            {/* PEGANDO A PROPRIEDADE INJETADA POR PARAMETRO PARA EXIBIR ELA NO HTML */}
            <h1>{ children }</h1>
        </header>
    );
}