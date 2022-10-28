import type { AWS } from '@serverless/typescript';
import type {  } from '@serverless/typescript';
import type {  } from 'serverless';

const serverlessConfiguration = async ({ options, resolveVariable }) : Promise<AWS> => {
  const stage = await resolveVariable('sls:stage');
  const serviceName = "toy";
  const awsRegion = await resolveVariable('aws:region');
  const awsAccountID = await resolveVariable('aws:acountId');
  const DYNAMODB_FEED_TABLE = `${serviceName}-feed-${stage}`;

  return {
    org: "artizon",
    app: "toy",
    service: serviceName,
    frameworkVersion: "^3",
    provider: {
      name: "aws",
      runtime: "nodejs14.x",
      environment: {
        // 'self' to reference property of the same object
        // 'sls' (serverless) to reference serverless-core-variables
        // 'sls:stage' == ${opt:stage, self:provider.stage, "dev"}
        // 'sls:instanceId': a unique ID for the each run of the serverless CLI
        // 'env:SOME_VAR to reference env var. Can go into the build log (cloudformation)
        // so don't put sensitive info. Use 'params' instead
        DYNAMODB_FEED_TABLE: DYNAMODB_FEED_TABLE
      },
      iam: {
        role: {
          statements: [
            {
              Effect: "Allow",
              Action: [
                "dynamodb:PutItem",
                "dynamodb:Get*",
                "dynamodb:Scan*",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem"
              ],
              Resource: `arn:aws:dynamodb:${awsRegion}:${awsAccountID}:table/${DYNAMODB_FEED_TABLE}`
            }
          ]
        }
      }
    },
    functions: {
      postFeed: {
        handler: "src/postFeed.postFeed",
        events: [
          {
            httpApi: {
              path: "/postFeed",
              method: "post",
            }
          }
        ]
      },
      getFeed: {
        handler: "src/getFeed.getFeed",
        events: [
          {
            httpApi: {
              path: "/getFeed",
              method: "get"
            }
          }
        ]
      }
    },
    plugins: [
      "serverless-esbuild"
    ],
    custom: {
      esbuild: {
        bundle: stage === 'dev' ? false : true,
        minify: stage === 'dev' ? false : true
      }
    },
    resources: {
      Resources: {
        FeedTable: {
          Type: "AWS::DynamoDB::Table",
          Properties: {
            BillingMode: "PAY_PER_REQUEST",
            AttributeDefinitions: [
              {
                AttributeName: "primary_key",
                AttributeType: "S"
              }
            ],
            KeySchema: [
              {
                AttributeName: "primary_key",
                KeyType: "HASH"
              }
            ],
            TableName: DYNAMODB_FEED_TABLE
          }
        }
      }
    },
  }
}

module.exports = serverlessConfiguration;