import React, { Component } from 'react';
import '../../assets/css/meal_card.css';
export default class MealCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('meal props ', this.props);
    return (
      <div className='col-md-6 mt-4'>
        <div class='card'>
          <div class='card-header d-flex justify-content-between'>
            <span className='text-capitalize'>{this.props.mealName}&nbsp;</span>

            <span>{this.props.calorie} Calories</span>
            <span>{this.props.modifiedOn.split('T')[0]}</span>
          </div>
          <div class='card-body'>
            <h5 class='card-title'>Meal Description</h5>
            <p class='card-text'>{this.props.description}</p>
            <div>
              <a href='#' class='btn btn-primary mt-4 mr-2 '>
                Update Meal
              </a>
              <a href='#' class='btn btn-primary mt-4 ml-2'>
                Delete Meal
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
