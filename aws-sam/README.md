# Notes

## AWS Serverless Application Model (SAM)
- Provide features including debug locally and integration with CI/CD
- [Using container image for AWS SAM](https://aws.amazon.com/blogs/compute/using-container-image-support-for-aws-lambda-with-aws-sam/)
- [AWS Lambda base images Github](https://github.com/aws/aws-lambda-base-images)
- [`template.yaml` reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html)
- Template file similar to AWS Cloudformation template file

## AWS IAM
An extension of AWS CloudFormation 

**IAM Management**
- Through either: AWS CLI, AWS SDK, AWS console, AWS HTTPS endpoint
- 

```json
// Example JSON policy (grant user/group/role permission)
// Books table in the 123456789012 account within the us-east-2 Region.
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "dynamodb:*",
    "Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/Books"
  }
}
```

**Access key**
- Long-term
- Access key consists of 2 parts: key ID and Key secret

**IAM roles**
- Short-term / temporary

## AWS Lambda

**SDK**
- [Usage with Typescript](https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html)
- The Node.js runtime passes three arguments to the handler method:
  - `event`
  - [`context`](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html): information about the invocation and execution environment
  - `callback` (non-async handlers only): invoking it to generate the response
  - without `callback`: use `return` or `throw` error to generate response

**[Deployment Packages](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html)**
- Method 1: container image - upload to AWS Elastic Container Registry (ECR) and deploy by specifying the image URL
- Method 2: `.zip` - directly supplying the `.zip`, or upload to S3
- Actual deploy step done in either CLI, SDK, console, HTTP endpoint, etc

**Execution Environment**
- Manages the resources required to run the function
- Provides lifecycle support for the function's runtime and any external extensions associated with the function

**Lambda Extensions**
- External, or internal. External: run as separate process in the execution environment
- Add extensions via one of the standard ways: e.g. Terraform, console, CLI, etc
- Function  <--Runtime-API--> Lambda Core
- Extension <--Extension-API--> Lamdba Core
- Extension --Log-API--(subscribe to)-> Function (Lambda Core in-between)
- If deployment package is container image, Lambda Core (Runtime API, Extension API, etc) is already included. Otherwise if deployment package is `.zip`, runtime is selected from a preset

**Layer (non-container-image-only)**
- AWS Lambda's "module system". Promote code sharing.

**Asynchronous Invocation and Event System**
- Lambda Core includes an async event queue (for both out-going and in-coming), that include retry mechanism
- A separate process will read events from the queue and send event to the Lambda function
- On demand (e.g. HTTP request, or event from event queue), Lambda Core will trigger Lambda function
- Destination: the destination in an event of an asynchronous invocation (e.g. fail processing). Destination includes AWS SQS, AWS SNS, etc...
- Event-source mapping: Map batch of items in source (e.g. AWS Kinesis stream) to a batch of event, which is then processed by Lambda function

**[Concurrency Control](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-features.html#gettingstarted-features-concurrency)**
- Provisioned concurrency: pre-initialize instances to avoid fluctuations in latency (cold-start)
- Reserved concurrency: splits the pool of available concurrency into subsets in order to reserve a portion of your account's available concurrency for a particular function

**Function URL invocation (i.e. HTTP endpoint)**
- If your function URL uses the `AWS_IAM` auth type, you must sign each HTTP request using [AWS Signature Version 4 (SigV4)](https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html). Lambda processes the request only if the signatures match
- When a client calls the function URL, Lambda core maps the request to an event object before passing it to your function. Function's response event is then mapped to an HTTP response
- Request and response event format follows [AWS API Gateway payload format](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format)
- [Request and response payload format ref](https://docs.aws.amazon.com/lambda/latest/dg/urls-invocation.html#urls-invocation-basics)
- Cookies: don't manually add set-cookie headers. Instead, include the cookies in your response payload object. Lambda automatically interprets this and adds them as `set-cookie` headers

**[Runtime Interface Emulator](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html)**
- A proxy for the Lambda Runtime API that allows you to locally test your Lambda function packaged as a container image
- A lightweight web server that converts HTTP requests into JSON events to pass to the Lambda function in the container image