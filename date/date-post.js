const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);

  const travelId = data.travelId;
  const startDate = data.startDate;
  const finishDate = data.finishDate;

  const param = {
    TableName: 'travelTable',
    Key: {
      travelId: travelId,
      UUID: 'date-post' // uuidv4().split('-').join('')
    },
    ExpressionAttributeNames: {
      '#s': 'startDate',
      '#f': 'finishDate',
      '#d': 'dataType'
    },
    ExpressionAttributeValues: {
      ':startDate': startDate,
      ':finishDate': finishDate,
      ':dataType': 'date'
    },
    UpdateExpression: 'SET #s = :startDate, #f = :finishDate, #d = :dataType'
  };
  await new Promise((resolve) => {
    dynamoDocument.update(param, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        resolve(data);
      }
    });
  });

  const response = {
    statusCode: 200,
    headers: {
      // 'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  };
  return response;
};