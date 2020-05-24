const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {

  console.log('caption-get');

  const params = event.queryStringParameters;
  const travelId = params.travelId;

  const queryParam = {
    TableName: 'travelTable',
    IndexName: 'travelId-dataType-index',
    KeyConditionExpression: '#k = :val AND #d = :dataType',
    ExpressionAttributeValues: {
      ':val': travelId,
      ':dataType': 'caption'
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
  let caption;
  try {
    caption = promise.Items[0].dataValue;
  } catch (e) {
    console.log(e);
    caption = '';
  }
  const response = {
    statusCode: 200,
    headers: {
      // 'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(caption)
  };
  return response;
};