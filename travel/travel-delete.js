const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const travelId = params.travelId;

  const param = {
    TableName: 'travelTable',
    KeyConditionExpression: '#k = :val',
    ExpressionAttributeValues: {
      ':val': travelId
    },
    ExpressionAttributeNames: {
      '#k': 'travelId'
    }
  };
  const promise = await new Promise((resolve, reject) => {
    dynamoDocument.query(param, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        resolve(data);
      }
    });
  });

  console.log(promise);

  const requestArry = [];

  for (const property in promise.Items) {
    //console.log(property);
    //console.log(promise['Items'][property]);
    const deleteParam = {
      TableName: 'travelTable',
      Key: {
        travelId: travelId,
        UUID: promise['Items'][property]['UUID']
      }
    };
    await new Promise((resolve, reject) => {
      dynamoDocument.delete(deleteParam, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

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