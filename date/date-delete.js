const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const travelId = params.travelId;

  const param = {
    TableName: 'travelTable',
    IndexName: 'travelId-dateType-index',
    KeyConditionExpression: '#t = :travelId, #d = :dataType',
    ExpressionAttributeValues: {
      ':travelId': travelId,
      ':dataType': 'date'
    },
    ExpressionAttributeNames: {
      '#t': 'travelId',
      '#d': 'dataType'
    }
  };
  await new Promise((resolve, reject) => {
    dynamoDocument.delete(param, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

};