import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root, body {
    font: 16px 'Roboto', sans-serif;
  }

  span {
    margin: 0;
    padding: 0;
}
`;

export default GlobalStyles;
