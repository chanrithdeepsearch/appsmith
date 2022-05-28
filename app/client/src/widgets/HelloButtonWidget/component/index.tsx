import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  width: 100%;
  height: 100%;
`;

function HelloButtonComponent(props: HelloButtonComponentProps) {
  return (
    <StyledButton
      onClick={() => {
        alert(`Hello ${props.title}`);
      }}
      type="button"
    >
      {props.title}
    </StyledButton>
  );
}

export interface HelloButtonComponentProps {
  title: string;
}

export default HelloButtonComponent;
