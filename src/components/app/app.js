import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from '../error-button';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components'

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundary>
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PersonDetails itemId={11} />
        <PlanetDetails itemId={5} />
        <StarshipDetails itemId={9} />

        <PersonList />
        <StarshipList />
        <PlanetList />

      </ErrorBoundary>
    );
  }
};