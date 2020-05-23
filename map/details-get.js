const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();
const axios = require('axios');

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const placeId = params.placeId;

  const APIKey = process.env.MAP_API_KEY;

  console.log(placeId, APIKey);

  const res = await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${APIKey}&placeid=${placeId}`
    )
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  console.log(res.data);

  const response = {
    statusCode: 200,
    headers: {
      'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(res.data)
  };
  return response;

};