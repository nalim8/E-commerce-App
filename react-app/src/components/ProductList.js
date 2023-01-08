import { ProductTile } from './ProductTile'
import { React } from 'react'

export class ProductList extends React.Component {
  renderTile = () => {
      return <ProductTile></ProductTile>;
  }

  render() {
    let tiles = [];
    for (let i = 0; i < this.props.products.length; i++) {
      const current_item = this.props.products[i];
      tiles.push(this.renderTile(current_item));
    }
    return tiles;
  }
}

