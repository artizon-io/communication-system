# Notes

## Serverless
- Infrasture as code
- Opinionated, third-party, high-level (thick) wrapper around (compiled down to, like many others) AWS cloudformation

**Alternatives**
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [SST](https://sst.dev/)
- Terraform
- CDK for Terraform (CDKTF)
- [Pulumi](https://www.pulumi.com/)
- AWS Amplify

**Variables**
- `sls` for serverless-core-variables. `sls.instanceId` and `sls.stage`
- `self` to reference other properties of the configuration object
- `env` for env variables
- `params` for sensitive environment variables (secrets), and for defining properties that change depending on stage
- `opt` to reference the passed-in CLI options e.g. `opt.stage`
- `cf` to reference the output of other services (cloudformation)
- `s3:bucketName/key`
- `aws`. `aws.region` and `aws.accountId`
- `ssm` to reference AWS SSM, which manages other AWS services e.g. AWS secret manager
- `file(./myFile.yml)` to reference other file configuration object
- `var1, var2, var3`: if var1 is not provided, use var2, and so on...

**Stage**
- i.e. Mode e.g. production/development

## AWS Cloud Formation

## AWS Lambda

- [Usage with Typescript](https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html)
- The Node.js runtime passes three arguments to the handler method:
  - `event`
  - [`context`](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html): information about the invocation and execution environment
  - `callback` (non-async handlers only): invoking it to generate the response
  - without `callback`: use `return` or `throw` error to generate response