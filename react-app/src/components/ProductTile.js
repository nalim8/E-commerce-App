import React from 'react'
import './ProductTile.css'

export class ProductTile extends React.Component {
  render() {
    return ( 
      <>
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
              <img src={this.props.product.image} alt="Placeholder image"></img>
          </figure>
        </div>
        <div class="card-content">
          <p class="title product-title">{this.props.product.name}</p>

          <div class="content">
            {this.props.product.short_description}
            <br></br>
          </div>
          <a class="button is-primary" href={"product.html?id=" + this.props.product.id.toString()} target="_blank">
              <strong>More Details</strong>
          </a>
        </div>
      </div>
      </>
    )
  }
  
}