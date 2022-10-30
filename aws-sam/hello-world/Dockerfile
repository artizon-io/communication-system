FROM 365381553697.dkr.ecr.ap-east-1.amazonaws.com/communication-system-lambda-nodejs18:latest

COPY app.js package.json .
# Production Copy yarn.lock .

RUN yarn install
# Production
# RUN yarn install --frozen-lockfile

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambdaHandler"]
