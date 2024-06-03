import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins';
import App from './App.jsx'

const customTheme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    backgroundGrey: '#141318',
    panelGrey: '#24232B',
    textGrey: '#7F849E',
    brandGreen: '#00FFA2',
    brandPurple: '#8655FF',
    brandPurpleHover: '#774BE3',
    brandGreenScheme: {
      500: "#00FFA2",
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
