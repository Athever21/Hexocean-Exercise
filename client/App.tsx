import React from "react";
import {hot} from "react-hot-loader";
import styled from "styled-components";

const Div = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #023034;
`

const H1 = styled.h1`
  color: #a33242;
  font-size: 5rem;
`

const App = () => {
  return(
    <Div>
      <H1>Hello World!</H1>
    </Div>
  )
}

export default hot(module)(App);