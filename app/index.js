import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid/Grid';
import './index.scss';

class App extends React.Component {
  render() {
    return <Grid />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
