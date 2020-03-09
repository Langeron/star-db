import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span> { item[field] } </span>
    </li>
  );
};

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
    const content = hasContent ? <ItemView item={item} image={image} children={this.props.children} /> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const ItemView = ({ item, image, children }) => {
  const { name } = item;

  return (
    <React.Fragment >
      <img className="item-image" src={image} />

      <div className="card-body">
        <h4> {name} </h4>
        <ul className="list-group list-group-flush">
          { 
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item })
            })
          }
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  )
}

export { Record };