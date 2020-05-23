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

  const items = promise.Items;
  console.log(items);

  let startDate,
    finishDate;

  for (const property in items) {
    // console.log((items[property]).hasOwnProperty('startDate'));
    if ((items[property]).hasOwnProperty('startDate')) {
      startDate = items[property].startDate;
    }
    if ((items[property]).hasOwnProperty('finishDate')) {
      finishDate = items[property].finishDate;
    }
  }

  console.log(startDate, finishDate);

  const response = {
    statusCode: 200,
    headers: {
      'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      startDate: startDate,
      finishDate: finishDate
    })
  };
  return response;

};