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
      travelId: travelId
    },
    ExpressionAttributeNames: {
      '#t': 'travelId',
      '#s': 'startDate',
      '#f': 'finishDate'
    },
    ExpressionAttributeValues: {
      ':travelId': travelId,
      ':startDate': startDate,
      ':finishDate': finishDate
    },
    UpdateExpression: 'SET #t = :travelId, #s = :startDate, #f = :finishDate'
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
      'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  };
  return response;
};