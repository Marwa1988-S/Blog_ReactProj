import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './redux/reducer'

import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { cyan, green,white, pink } from '@material-ui/core/colors';
const myTheme = createMuiTheme({
  
  palette: {
    primary: {
     main: cyan[400],     //"#28a7bb"
     contrastText: '#fff', 
    },
    secondary: pink
  }
  

})

const store = createStore(reducer, applyMiddleware(thunk))  //
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
