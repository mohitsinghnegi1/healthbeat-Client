import React, { Component, useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/Store';
import { Logout } from '../../services/Authentication';

import hand from '../../assets/img/hand.svg';
import MealCard from './MealCard';
import '../../assets/css/home.css';
import '../../assets/css/search.css';
import MyModal from '../Modal/MyModal';
import { GetUserMeals } from '../../services/util';

export default function Home(props) {
  const [state, setState] = useState({
    meals: ['Meal 1', 'Meal 2', 'Meal 3', 'meal 4', 'Meal 5', 'Meal 6'],
  });
  const [store, setStore] = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const [userMeals, setUserMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    GetUserMeals(changeState, setTotalCalories);
  }, []);

  const changeState = (stateInfo) => {
    setUserMeals(stateInfo);
  };

  const renderMeals = (userMeals) => {
    // GetUserMeals(changeState);

    var obj = userMeals.map((meal) => {
      console.log(meal);

      return <MealCard {...meal} />;
    });

    return obj;
  };

  function openModal() {
    setShowModal(true);
  }
  const closeModel = () => {
    setShowModal(false);
  };
  console.log(userMeals);
  return (
    <div>
      <MyModal show={showModal} closeModel={closeModel} text='Add Meal' />
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
                <div className='col-md-12 text-center mt-3 text-success'>
                  <h4>
                    Total Calories Consuption : <b>{totalCalories}</b>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='meal-container container '>
        <div className='ml-3 d-flex  justify-content-center '>
          <div className='row'>
            <div
              className='logout-btn mt-4 add-meal mr-4'
              onClick={() => openModal()}>
              Add Your Meal
            </div>
            <div className='logout-btn mt-4 add-meal'>Filter Meal</div>
          </div>
        </div>
        <div className='row pl-3 pr-3 pb-5'>{renderMeals(userMeals)}</div>
      </div>
    </div>
  );
}
