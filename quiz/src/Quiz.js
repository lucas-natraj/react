import React from 'react';
// import logo from './logo.svg';
import { connect } from 'react-redux';
import './bootstrap.min.css'
import './App.css';

function mapStateToProps(state) {
  return {
    turnData: state.turnData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onContinue: () => dispatch({ type: 'CONTINUE' }),
    onSelect: (option) => dispatch({ type: 'SELECT', option: option})
  };
}

export const Quiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({ turnData, onContinue, onSelect }) {
    return (
      <div className="container-fluid">
        <Title {...turnData} />
        <Turn {...turnData} onAnswerSelected={onSelect} />
        <Continue show={true} onContinue={onContinue} />
        <Footer />
      </div>
    );
  });

function Title({ animal, language }) {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1 title">
        <h1>Language Quiz</h1>
        <br />
        <h4>how do you say '{animal.name}' in {language}?</h4>
      </div>
    </div>
  );
}

function Turn({ animal, language, options, onAnswerSelected}) {
  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <div className="row">
          <img src={animal.imageUrl} className="animalImage" alt="Author" />
        </div>
      </div>
      <div className="col-6">
        {Object.keys(options).map((key, index) =>
          <Option key={key} option={options[key]} answer={animal.other_names[language]} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

function Option({ option, answer, onClick }) {

  let hidden = true;

  let img = '';
  if (option.picked) {
    img = (option.text === answer) ? 'correct' : 'wrong';
    hidden = false;
  }
  const path = 'images/status/' + img + '.png';

  return (
    <div className="container">
      <div className="row name" onClick={(e) => onClick(option)}>
        <div className="status col-md-1"><img className="status" src={path} hidden={hidden} alt={img} /></div>
        <div className="option col-md-11"><h4>{option.text}</h4></div>
      </div>
    </div>
  );
}

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">{
      show ?
        <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>continue</button>
        </div> : null
    }
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          created by null-reference
        </p>
      </div>
    </div>
  );
}