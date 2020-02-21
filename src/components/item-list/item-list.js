import React, { Component } from 'react';

import './item-list.css';
import Spinner from '../spinner';

class ItemList extends Component {

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.children(item);
      return (
        <li className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      )
    });
  };

  render() {

    const { data } = this.props;

    const items = this.renderItems(data);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}

const f = () => {
  return class extends Component {

    state = {
      data: null
    }

    componentDidMount() {

      const { getData } = this.props;

      getData()
        .then((data) => {
          this.setState({
            data
          });
        });
    };

    render() {

      const { data } = this.state;

      if (!data) {
        return <Spinner />
      }

      return <ItemList {...this.props} data={data} />
    }
  };
};

export default f();