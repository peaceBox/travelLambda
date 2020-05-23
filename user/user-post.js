const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);

  const travelId = data.travelId;
  const userId = data.userId;

  const param = {
    TableName: 'travelTable',
    Item: {
      travelId: travelId,
      UUID: userId,
      dataType: 'userId',
      dataValue: userId
    }
  };
  await new Promise((resolve) => {
    dynamoDocument.put(param, (err, data) => {
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