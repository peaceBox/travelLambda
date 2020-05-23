const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const params = event.queryStringParameters;
  const travelId = params.travelId;

  const param = {
    TableName: 'travelTable',
    IndexName: 'dataValue-index',
    KeyConditionExpression: '#k = :val, #d = :dataValue',
    ExpressionAttributeValues: {
      ':val': travelId,

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


};