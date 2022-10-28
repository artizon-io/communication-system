import AWS from 'aws-sdk';
// import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export async function postFeed(event : ApiGatewayProxyCall, context: HttpContext) : Promise<> {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  await dynamoDB.put({
    TableName: process.env.DYNAMODB_FEED_TABLE,
    Item: {
      primary_key: context.awsRequestId,
      author: body.author,
      body: body.body,
    },
  }).promise();
  return {
    statusCode: 201,
    message: 'Successfully post feed',
    input: event,
  };
}