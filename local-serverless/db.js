const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({
    region: "us-west-2",
    accessKeyId: "access_key_id",
    secretAccessKeyId: "secret_access_key",
    endpoint: "http://localhost:8000"
});

module.exports = client;