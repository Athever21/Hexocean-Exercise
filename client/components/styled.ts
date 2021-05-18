import styled from "styled-components";

const input = `
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  background: var(--input);
  border: 1px solid #000;
`

export const Label = styled.label`
  font-size: 1.3rem;
  margin: 0.5rem 0;
`

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  ${input}
  ::placeholder {
    color: var(--font)
  }
`;

export const Time = styled.div`
  display: flex;
  width: 100%;
  
  input {
    flex-grow: 1;
  }

  @media (max-width: 1228px) {
    flex-direction: column;
  }
`

export const Select = styled.select`
  ${input}
`

export const Button = styled.button`
  ${input}
  width: 100%;
  background: var(--button);

  &:hover {
    background: var(--button-hover);
    cursor: pointer;
  }
`

export const Error = styled.p`
  margin: 0.2rem 0;
  font-size: 1.1rem;
  color: var(--error);
`

export const Success = styled.div`
  position: fixed;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  text-align: center;
  background: var(--success);
  padding: 1rem;
  width: 50%;
`