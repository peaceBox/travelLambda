const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);
  const travelId = data.travelId;
  const placeData = data.placeData;

  for (const property in placeData) {
    const placeId = placeData[property].placeId;
    const turn = placeData[property].turn;
    const date = placeData[property].date;
    const UUID = placeData[property].UUID;

    const param = {
      TableName: 'travelTable',
      Key: {
        travelId: travelId,
        UUID: UUID
      },
      ExpressionAttributeNames: {
        '#p': 'placeId',
        '#t': 'turn',
        '#d': 'date',
        '#e': 'dataType',
      },
      ExpressionAttributeValues: {
        ':placeId': placeId,
        ':turn': turn,
        ':date': date,
        ':dataType': 'place',
      },
      UpdateExpression: 'SET #p = :placeId, #t = :turn, #d = :date, #e = :dataType'
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
  }

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