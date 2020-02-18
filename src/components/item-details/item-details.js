import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({loading: true})
      this.updateItem();
    }
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
        });
      })
      .catch((err) => this.onError());
  };

  render() {

    const { item, loading, error, image } = this.state;

    if (!item) {
      return <span>Select a item from a list</span>
    }

    const hasContent = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasContent ? <ItemView item={item} image={image}/> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const ItemView = ({ item, image }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <React.Fragment >
      <img className="item-image" src={image} />

      <div className="card-body">
        <h4> {name} </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span> {gender} </span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span> {birthYear} </span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span> {eyeColor} </span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  )
}