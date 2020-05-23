const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const userId = params.userId;

  const queryParam = {
    TableName: 'travelTable',
    IndexName: 'dataValue-index',
    KeyConditionExpression: '#k = :val',
    ExpressionAttributeValues: {
      ':val': userId
    },
    ExpressionAttributeNames: {
      '#k': 'dataValue'
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
      travelId: items[property].travelId
    });
  }

  const response = {
    statusCode: 200,
    headers: {
      'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(arr)
  };
  return response;

};