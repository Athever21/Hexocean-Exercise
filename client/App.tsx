import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import Loading from "./components/Loading";

const Form = lazy(() => import("./components/Form"));

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`

const H1 = styled.h1`
  text-align: center;
  color: var(--main);
  margin: 1rem 0;
  font-size: 3.5rem;
`;

const App = () => {
  return (
    <Container>
      <H1>Dish Form</H1>
      <Wrapper>
        <Suspense fallback={<Loading />}>
          <Form />
        </Suspense>
      </Wrapper>
    </Container>
  );
};

export default hot(module)(App);
