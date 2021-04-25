import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

export default class FetchRandomUser extends React.Component{
  state={
    loading:true,
    strDrink:null,
  };
  // componentDidMount(){
  //   const url = "https://rapidapi.com/thecocktaildb/api/"
  // }
  async componentDidMount(){
    const url = "https://rapidapi.com/thecocktaildb/api/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({strDrink : data.results[0]})
    // console.log(data.results[0]);
  }

  render(){
    return(
      <div>
        {this.state.loading ? <div>loading..</div>:<div>strDrink..</div> }
      </div>
    )
  }
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
