import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from '../error-button';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service'

import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components'

export default class App extends Component {

  
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onServiceChange = (evt) => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
        
        return {
          swapiService: new Service
        }
    })
  }

  render() {

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />
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
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};