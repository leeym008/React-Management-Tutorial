import React, { Component } from 'react';
import '../App.css';
import {withStyles} from '@material-ui/core/styles'
import ScatterChart from '../components/ScatterChart';

class DashBoard extends Component {
  render() {
    return (
      <div>
        <ScatterChart/>
      </div>
    );
  }
}

export default withStyles()(DashBoard);