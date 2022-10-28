import AWS from 'aws-sdk';
 

export async function getFeed(event : any) {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDB.scan({
    TableName: process.env.DYNAMODB_FEED_TABLE,
  }).promise();
 
  if (!result.Items) {
    return {
      statusCode: 404,
    };
  }
 
  return {
    statusCode: 200,
    body: JSON.stringify({
      total: result.Count,
      items: result.Items.map(single_feed => {
        return {
          id: single_feed.primary_key,
          author: single_feed.author,
          body: single_feed.body,
        };
      }),
    }),
  };
}