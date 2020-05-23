const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();
const axios = require('axios');

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const placeId = params.placeId;

  const APIKey = process.env.MAP_API_KEY;
  const res = await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${APIKey}&&place_id=${placeId}`
    )
    .then((res) => {
      console.log(res.data.result);
    });

  const response = {
    statusCode: 200,
    headers: {
      'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      startDate: startDate,
      finishDate: finishDate
    })
  };
  return response;

};