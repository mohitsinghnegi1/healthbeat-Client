import React, { Component, useContext, useState } from 'react';
import { StoreContext } from '../context/Store';
import { Logout } from '../../services/Authentication';

import hand from '../../assets/img/hand.svg';
import MealCard from './MealCard';
import '../../assets/css/home.css';
import '../../assets/css/search.css';
export default function Home(props) {
  const [state, setState] = useState({
    meals: ['Meal 1', 'Meal 2', 'Meal 3', 'meal 4', 'Meal 5', 'Meal 6'],
  });
  const [store, setStore] = useContext(StoreContext);

  const signOut = () => {
    Logout(store, setStore);
  };
  console.log(store.user.isAuthenticated);

  const renderMeals = () => {
    return state.meals.map((meal) => {
      return <MealCard meal={meal} />;
    });
  };

  return (
    <div>
      <div className='mask_container '>
        <div className='container  pt-5 pb-4 d-flex justify-content-center '>
          <div class='col-md-5'>
            <div id='custom-search-input'>
              <div class='row'>
                <div class='col-md-12'>
                  <input
                    class='search-query form-control'
                    placeholder='Search Meal'
                    type='text'
                  />
                  <span class='input-group-btn'>
                    <button class='btn btn-danger' type='button'></button>
                  </span>{' '}
                </div>
                <div className='col-md-12 text-center mt-3 text-white'>
                  Browse dozens of meal plans to find one that's right for you
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='meal-container container'>
        <div className='row pl-3 pr-3 mb-5'>{renderMeals()}</div>
      </div>
    </div>
  );
}
