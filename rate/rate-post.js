const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.main = async (event) => {
  const data = JSON.parse(event.body);

  const placeId = data.placeId;
  const userRate = data.rate;

  const getParams = {
    Bucket: 'travel.peacebox.dev',
    Key: 'data.json'
  };

  const json = await (() => {
    return new Promise((resolve, reject) => {
      s3.getObject(getParams, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          const object = data.Body;
          console.log(object);
          return resolve(object);
        }
      });
    });
  })();

  for (const property in json) {
    if (json[property].placeId === placeId) {
      let rate = json[property].rate;
      let numberOfReviewers = json[property].numberOfReviewers;
      if (numberOfReviewers && rate) {
        json[property].rate = (rate * numberOfReviewers + userRate) / numberOfReviewers + 1;
        json[property].numberOfReviewers = numberOfReviewers++;
      }
    }
  }

  const uploadParams = {
    Body: json,
    Bucket: 'travel.peacebox.dev',
    Key: 'data.json',
    ContentType: 'application/json',
    // ACL: 'public-read'
  };

  await new Promise((resolve, reject) => {
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log('error : ', err);
        reject(err);
      } else {
        console.log('success');
        resolve();
      }
    });
  });

  const response = {
    statusCode: 200,
    headers: {
      // 'Location': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Origin': 'https://travel.sugokunaritai.dev',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  };
  return response;
};