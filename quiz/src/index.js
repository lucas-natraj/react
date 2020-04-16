import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import { Quiz } from './Quiz';
import * as serviceWorker from './serviceWorker';
import { shuffle } from 'underscore';

const animals = [{
  name: 'cow',
  imageUrl: 'images/animals/cow.png',
  other_names: {
    french: 'vache',
    norwegian: 'ku',
    spanish: 'vaca',
    lithuanian: 'karvė'
  }
}, {
  name: 'horse',
  imageUrl: 'images/animals/horse.png',
  other_names: {
    french: 'cheval',
    norwegian: 'hest',
    spanish: 'caballo',
    lithuanian: 'arklys'
  }
}, {
  name: 'lamb',
  imageUrl: 'images/animals/lamb.png',
  other_names: {
    french: 'agneau',
    norwegian: 'lam',
    spanish: 'cordero',
    lithuanian: 'ėriukas'
  }
}, {
  name: 'pig',
  imageUrl: 'images/animals/pig.png',
  other_names: {
    french: 'cochon',
    norwegian: 'gris',
    spanish: 'cerda',
    lithuanian: 'kiaulė'
  }
},{
  name: 'rabbit',
  imageUrl: 'images/animals/rabbit.png',
  other_names: {
    french: 'lapin',
    norwegian: 'kapin',
    spanish: 'conejo',
    lithuanian: 'triušis'
  }
},{
  name: 'sheep',
  imageUrl: 'images/animals/sheep.png',
  other_names: {
    french: 'mouton',
    norwegian: 'sau',
    spanish: 'oveja',
    lithuanian: 'avis'
  }
}]

const languages = ['french', 'norwegian', 'spanish', 'lithuanian']

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomElement(arr) {
  return arr[random(0, arr.length)];
}

function getTurnData(animals) {
  const animal = randomElement(animals);
  const language = randomElement(languages);

  const allAnimalNames = animals.reduce((acc, cv) => {
    return acc.concat(Object.keys(cv.other_names).map((key, index) => cv.other_names[key]))
  }, []);

  const options = new Set();
  options.add(animal.other_names[language]);
  while (options.size < 4) {
    options.add(randomElement(allAnimalNames));
  }

  const data = {
    animal: animal,
    language: language,
    options: shuffle(Array.from(options)).map(o => {
      return {
        text: o,
        picked: false
      }
    })
  };

  return data;
}

const initialState = {
  turnData: getTurnData(animals)
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT': {
      let s = {
        turnData: Object.assign({}, state.turnData)
      };
      s.turnData.options.forEach(opt => {
        opt.picked = (opt === action.option)
      });
      return s;
    }
    case 'CONTINUE':
      return Object.assign(
        {},
        state,
        {
          turnData: getTurnData(animals)
        })
    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function App() {
  return (
    <ReactRedux.Provider store={store}>
      <Quiz />
    </ReactRedux.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
