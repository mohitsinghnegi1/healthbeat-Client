import React, { Component } from 'react';
import '../../assets/css/meal_card.css';
export default class MealCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='col-md-6 mt-4'>
        <div class='card'>
          <div class='card-header'>{this.props.meal}</div>
          <div class='card-body'>
            <h5 class='card-title'>Meal Description</h5>
            <p class='card-text'>
              Gut busting, best-dressed seared to sizzle-crisp on the outside.
              Sloppy with chin-dripping juice on the inside.
            </p>
            <a href='#' class='btn btn-primary mt-4 '>
              Add meal
            </a>
          </div>
        </div>
      </div>
    );
  }
}
