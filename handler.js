'use strict';

module.exports.hello = async event => {

  const path = event.path;
  const method = event.httpMethod;

  let res;

  switch (path) {
    case '/date':
      switch (method) {
        case 'DELETE':
          res = require('./date/date-delete').main(event);
          break;
        case 'GET':
          res = require('./date/date-get').main(event);
          break;
        case 'POST':
          res = require('./date/date-post').main(event);
          break;
      }
      break;
    case '/hotel':
      switch (method) {
        case 'DELETE':
          res = require('./hotel/hotel-delete').main(event);
          break;
        case 'GET':
          res = require('./hotel/hotel-get').main(event);
          break;
        case 'POST':
          res = require('./hotel/hotel-post').main(event);
          break;
      }
      break;
    case '/place':
      switch (method) {
        case 'DELETE':
          res = require('./place/place-delete').main(event);
          break;
        case 'GET':
          res = require('./place/place-get').main(event);
          break;
        case 'POST':
          res = require('./place/place-post').main(event);
          break;
      }
      break;
    case '/food':
      switch (method) {
        case 'DELETE':
          res = require('./food/food-delete').main(event);
          break;
        case 'GET':
          res = require('./food/food-get').main(event);
          break;
        case 'POST':
          res = require('./food/food-post').main(event);
          break;
      }
      break;
    case '/rate':
      switch (method) {
        case 'POST':
          res = require('./rate/rate-post').main(event);
          break;
      }
      break;
    case '/travel':
      switch (method) {
        case 'DELETE':
          res = require('./travel/travel-delete').main(event);
          break;
        case 'POST':
          res = require('./travel/travel-post').main(event);
          break;
      }
      break;
    case '/map/details':
      switch (method) {
        case 'GET':
          res = require('./map/details-get').main(event);
          break;
      }
      break;
  }

  return res;
};