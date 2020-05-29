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
  const [calorieConsuptionPerDay, setCalorieConsuptionPerDay] = useState(0);
  const [showTodaysMeals, setShowTodaysMeals] = useState(false);
  const [todaysMeals, setTodaysMeals] = useState([]);

  useEffect(() => {
    GetUserMeals(changeState, setTotalCalories);
    getTodayMeals(userMeals);
  }, []);

  useEffect(() => {
    getTodayMeals(userMeals);
  }, [userMeals]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(value);
    setSearchFor(value);
  };
  //getTodaysMeals
  const getTodayMeals = (userMeals) => {
    var curDate = new Date();
    var hour = curDate.getHours();
    var min = curDate.getMinutes();
    var sec = curDate.getSeconds();
    var ms = curDate.getMilliseconds();
    console.log('see', hour, min, sec, ms);

    var todayDate = new Date(
      new Date() - (hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000 + ms)
    );
    var calorieConsuptionPerDay = 0;

    var todayMeals = [];

    for (var i = 0; i < userMeals.length; i++) {
      var meal = userMeals[i];
      if (new Date(meal.modifiedOn) >= todayDate) {
        todayMeals.push(meal);
        calorieConsuptionPerDay += userMeals[i].calorie;
      }
    }
    console.log('toays meal ', todayMeals);
    console.log('perDay calorie consuption ', calorieConsuptionPerDay);
    setCalorieConsuptionPerDay(calorieConsuptionPerDay);
    setTodaysMeals(todayMeals);
  };

  const renderFilteredMeal = (userMeals) => {
    // return CustomNoRowsOverlayComponent();
    // console.log('data', data);

    if (searchfor === '') {
      //logic to get todays meal

      if (showTodaysMeals) {
        var curDate = new Date();
        var hour = curDate.getHours();
        var min = curDate.getMinutes();
        var sec = curDate.getSeconds();
        var ms = curDate.getMilliseconds();
        console.log('see', hour, min, sec, ms);

        var todayDate = new Date(
          new Date() -
            (hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000 + ms)
        );
        var calorieConsuptionPerDay = 0;

        var todayMeals = [];

        for (var i = 0; i < userMeals.length; i++) {
          var meal = userMeals[i];
          if (new Date(meal.modifiedOn) >= todayDate) {
            todayMeals.push(meal);
            calorieConsuptionPerDay += userMeals[i].calorie;
          }
        }
        console.log('toays meal ', todayMeals);
        console.log('perDay calorie consuption ', calorieConsuptionPerDay);
        // setCalorieConsuptionPerDay(calorieConsuptionPerDay);
        return renderMeals(todayMeals);
      }

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
  console.log(todaysMeals);

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
                {/* <div className='col-md-12 text-center mt-3 text-white'>
                  Browse dozens of meal plans to find one that's right for you
                </div> */}
                <div className='col-md-12 text-center mt-3 text-white'>
                  <h4>
                    {showTodaysMeals ? (
                      <span>
                        Today's Calories Consumption : {''}
                        <br />
                        <b
                          className={
                            calorieConsuptionPerDay > 1000
                              ? 'text-danger'
                              : 'text-success'
                          }>
                          {calorieConsuptionPerDay}/1000
                        </b>
                      </span>
                    ) : (
                      <span>
                        Total Calories Consumption : <br />
                        <b className='text-success'>{totalCalories}</b>
                      </span>
                    )}
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
            <div
              className={
                showTodaysMeals
                  ? 'logout-btn mt-4 add-meal text-white bg-success mr-4'
                  : 'logout-btn mt-4 add-meal mr-4'
              }
              onClick={() => {
                setShowTodaysMeals(true);
              }}>
              Show Today's Meal
            </div>
            <div
              className={
                showTodaysMeals
                  ? 'logout-btn mt-4 add-meal'
                  : 'logout-btn mt-4 add-meal text-white bg-success'
              }
              onClick={() => {
                setShowTodaysMeals(false);
              }}>
              Show All Meals
            </div>
          </div>
        </div>
        <div className='row pl-3 pr-3 pb-5'>
          {renderFilteredMeal(userMeals)}
        </div>
      </div>
    </div>
  );
}
