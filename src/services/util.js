import config from '../config/config';
import React from 'react';
const AddMeal = async (mealInfo, state, changeState) => {
  // call create user api

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const response = await fetch(config.MEAL_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(mealInfo),
  })
    .then((response) => {
      if (response.status == 401) {
        localStorage.clear();
        window.location.href('/');
      }
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      var errMsg;
      let message = null;
      if (data.error) {
        console.log('error ', data.error);
        message = data.message;
      } else {
        message = <span className='text-success'>{data.message}</span>;
      }
      changeState({ ...state, error: message });
    })
    .catch((error) => {
      console.log('error while adding meal :', error);
      var message = 'Something went wrong!!';
      changeState({
        ...state,
        error: message,
      });
    });

  // console.log('response', response);
  return response;
};

const UpdateMeal = async (payload, state, changeState) => {
  // call create user api

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const response = await fetch(config.MEAL_BASE_URL + '/' + state._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ data: payload }),
  })
    .then((response) => {
      if (response.status == 401) {
        localStorage.clear();
        window.location.href('/');
      }
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      var errMsg;
      let message = null;
      if (data.error) {
        console.log('error ', data.error);
        message = data.message;
      } else {
        message = <span className='text-success'>{data.message}</span>;
      }
      changeState({ ...state, error: message });
    })
    .catch((error) => {
      console.log('error while updating meal :', error);
      var message = 'Something went wrong!!';
      changeState({
        ...state,
        error: message,
      });
    });

  // console.log('response', response);
  return response;
};

// call delete meal api
const DeleteMeal = async (state, changeState) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const response = await fetch(config.MEAL_BASE_URL + '/' + state._id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      if (response.status == 401) {
        localStorage.clear();
        window.location.href('/');
      }
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      console.log('delete meal response ', data);
      var errMsg;
      let message = null;
      if (data.error) {
        console.log('error ', data.error);
        message = data.message;
      } else {
        message = <span className='text-success'>{data.message}</span>;
      }
      changeState({ ...state, error: message });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    })
    .catch((error) => {
      console.log('error while deleting meal :', error);
      // var message = 'Something went wrong!!';
      // changeState({
      //   ...state,
      //   error: message,
      // });
    });

  // console.log('response', response);
  return response;
};

//api call to get user meals
const GetUserMeals = async (changeState, setTotalCaloris) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  const response = await fetch(config.MEAL_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
  })
    .then((response) => {
      if (response.status == 401) {
        localStorage.clear();
        window.location.href('/');
      }
      return response.json();
      //use response.text() if you send text , if you send json then use json()
    })
    .then((data) => {
      if (data.hasOwnProperty('error') && !data.error) {
        changeState(data.meals);

        var count = 0;
        for (let i = 0; i < data.meals.length; i++) {
          count += data.meals[i].calorie;
        }
        setTotalCaloris(count);
      } else {
        console.log('error : Something went wrong');
      }
    })
    .catch((error) => {
      console.log('get meal error ', error);
      //   console.log('error while adding meal :', error);
      //   var message = 'Something went wrong!!';
      //   changeState({
      //     ...state,
      //     error: message,
      //   });
    });

  // console.log('response', response);
  return response;
};

export { AddMeal, GetUserMeals, UpdateMeal, DeleteMeal };
