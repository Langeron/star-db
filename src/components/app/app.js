import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage, StarshipsPage, PlanetsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

export default class App extends Component {


  state = {
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
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    })
  }

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />
          <RandomPlanet />

          <PeoplePage />
          <StarshipsPage />
          <PlanetsPage />

        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};