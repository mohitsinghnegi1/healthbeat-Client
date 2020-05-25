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
  const [store, setStore] = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const [userMeals, setUserMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [filteredMeal, setFilteredMeal] = useState([]);
  const [searchfor, setSearchFor] = useState('');

  useEffect(() => {
    GetUserMeals(changeState, setTotalCalories);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(value);
    setSearchFor(value);
  };

  const renderFilteredMeal = (userMeals) => {
    // return CustomNoRowsOverlayComponent();
    // console.log('data', data);

    if (searchfor === '') {
      console.log('search for 2 ', searchfor);
      // console.log('row  ', data, this.state.rowData);
      return renderMeals(userMeals);
    } else {
      var sVal = searchfor.toUpperCase();
      var filteredMeal = [];
      filteredMeal = userMeals.filter((meal) => {
        console.log('dd ', meal);
        return (
          meal.calorie.toString().indexOf(sVal) !== -1 ||
          meal.mealName.toUpperCase().indexOf(sVal) !== -1 ||
          meal.description.toUpperCase().indexOf(sVal) !== -1 ||
          meal.modifiedOn.toString().toUpperCase().indexOf(sVal) !== -1
        );
      });
      console.log('filtered data ', filteredMeal);
      if (filteredMeal.length === 0) {
        return NoSearchResult(searchfor);
      } else {
        return renderMeals(filteredMeal);
      }
    }
  };

  const NoSearchResult = (searchfor) => {
    return (
      <div className='container bg-white card mt-5 pt-5 pb-5'>
        Sorry , we couldn't find any Meal for {searchfor}
      </div>
    );
  };

  const changeState = (stateInfo) => {
    setUserMeals(stateInfo);
  };

  const renderMeals = (userMeals) => {
    console.log('filter me ', userMeals);
    var obj = userMeals.map((meal) => {
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
      <MyModal
        show={showModal}
        closeModel={closeModel}
        text='Add Meal'
        operation={'ADD_MEAL'}
      />
      <div className='mask_container '>
        <div className='container  pt-5 pb-4 d-flex justify-content-center '>
          <div class='col-md-5'>
            <div id='custom-search-input'>
              <div class='row'>
                <div class='col-md-12'>
                  <input
                    class='search-query form-control'
                    placeholder='Search by name , date , calories , description '
                    type='text'
                    value={searchfor}
                    onChange={handleChange}
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
        <div className='row pl-3 pr-3 pb-5'>
          {renderFilteredMeal(userMeals)}
        </div>
      </div>
    </div>
  );
}
