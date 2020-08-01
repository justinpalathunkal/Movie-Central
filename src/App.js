import React, {useState, Component} from 'react';
import Search from './components/Search';
import axios from 'axios';
import Result from './components/Result';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    x: "",
    results: [],
    selected: {}
  });
  const apiUrl = "http://www.omdbapi.com/?apikey=615a218a";
  const search = (e) => {
    if (e.key === "Enter") {
      console.log(state)
      axios(apiUrl + "&s=" + state.x).then(({data}) => {
        let results = data.Search;

        setState(prevState => {
          return {...prevState, results: results }
        })
      });
    }
  } 
 
  const inputHandler = (e) => {
    let x = e.target.value;
    setState(prevState => {
      return {...prevState, x: x }
    });
  }

  const openPopup = id => {
    axios(apiUrl + '&i=' + id).then(({ data }) => {
      let result = data;

      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
      <h1>Movie Reviews!</h1>
      </header>
      <main>
        <Search inputHandler={inputHandler} search={search}></Search>
        <Results results ={state.results} openPopup={openPopup}></Results>
        {(typeof state.selected.Title != "undefined") ? <Popup selected= {state.selected} closePopup={closePopup}></Popup> : false}
      </main>
    </div>
  );
}

export default App;
