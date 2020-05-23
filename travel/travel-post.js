const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);

  const groupId = data.groupId;

  const travelId = uuidv4().split('-').join('');
  const UUID = uuidv4().split('-').join('');

  const param = {
    TableName: 'travelTable',
    Key: {
      travelId: travelId,
      UUID: 'groupId'
    },
    ExpressionAttributeNames: {
      '#t': 'dataType',
      '#v': 'dataValue'
    },
    ExpressionAttributeValues: {
      ':dataType': 'groupId',
      ':dataValue': groupId
    },
    UpdateExpression: 'SET #t = :dataType, #v = :dataValue'
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
    body: JSON.stringify({
      travelId: travelId
    })
  };
  return response;
};