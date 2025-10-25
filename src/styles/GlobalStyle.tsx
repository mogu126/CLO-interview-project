import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, AvenirNextLTPro, "Noto Sans SC", sans-serif;
  }

  body {
    background-color: #1B1A21!important；
    color: #333;
    line-height: 1.6;
  }

  container {px
    max-width: 1440px;
    margin: 0 50px;
    padding: 20px;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    transition: all 0.2s ease;
  }

  input {
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;