const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {

  console.log('food-get');

  const params = event.queryStringParameters;
  const travelId = params.travelId;

  const queryParam = {
    TableName: 'travelTable',
    IndexName: 'travelId-dataType-index',
    KeyConditionExpression: '#k = :val AND #d = :dataType',
    ExpressionAttributeValues: {
      ':val': travelId,
      ':dataType': 'food'
    },
    ExpressionAttributeNames: {
      '#k': 'travelId',
      '#d': 'dataType',
    }
  };
  const promise = await new Promise((resolve, reject) => {
    dynamoDocument.query(queryParam, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        resolve(data);
      }
    });
  });
  const items = promise.Items;
  const arr = [];
  for (const property in items) {
    arr.push({
      dataTurn: items[property].dataTurn,
      placeId: items[property].dataValue,
      UUID: items[property].UUID,
      date: items[property].date
    });
  }
  const response = {
    statusCode: 200,
    headers: {
      // 'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(arr)
  };
  return response;
};