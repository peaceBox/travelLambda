const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);

  const travelId = data.travelId;
  const placeId = data.placeId;

  const queryParam = {
    TableName: 'travelTable',
    IndexName: 'travelId-dataType-index',
    KeyConditionExpression: '#k = :val AND #d = :dataType',
    ExpressionAttributeValues: {
      ':val': travelId,
      ':dataType': 'hotel'
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
  const length = promise.Items.length;

  const UUID = uuidv4().split('-').join('');

  const param = {
    TableName: 'travelTable',
    Item: {
      travelId: travelId,
      UUID: UUID,
      dataType: 'hotel',
      dataValue: placeId,
      dataTurn: length + 1
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