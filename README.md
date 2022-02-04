# decentralize-real-estate


Commands for AWS using LocalStack
##Run LocalStack
docker run --rm -it -p 4566:4566 -p 4571;4571 localstack/localstack

##Configure AWS
aws configure

##Create dynamo db table using template file.
aws --endpoint-url=http://localhost:4566/ dynamodb create-table --cli-input-json file:///${locationOfTheTemplate.JSON} 

##View List of tables
aws --endpoint-url=http://localhost:4566/ dynamodb list-tables

##Delete table
aws --endpoint-url=http://localhost:4566/ dynamodb delete-table --table-name demo-table-creation-localstack


##Using docker compose
docker-compose up

##Create role
aws --endpoint-url=http://localhost:4566 iam create-role --role-name lambda-ex --assume-role-policy-document file://${DIRECTORY_TO_TRUST_POLICY.JSON}

- Save the output arn as we will need it in other commands like creating lambda functions.

##Creating lambda function.
aws --endpoint-url=http://localhost:4566 lambda create-function --function-name worker --zip-file
fileb://index.zip --handler index.handler --runtime nodejs12.x --role
${arn_returned_from_create_role_response}

##Execute created lambda function.
aws --endpoint-url=http://localhost:4566 lambda invoke --function-name worker out --log-type Tail --query 'LogResult' --output text



## Deploying node app as AWS Lambda using Claudia

- Generate AWS Lambda wrapper for express app : this is needed to make the app work
    `claudia generate-serverless-express-proxy --express-module app`

- This will generate lambda.js file which we need to deploy as lambda handler
    `claudia create --handler lambda.handler --deploy-proxy-api --region eu-central-1`





#Creating Bucket from console
- `aws s3 mb --endpoint-url http://localhost:4566/ --region us-east-1 "s3://static-s3-bucket"`
- prevent public Access to this bucket
    - aws s3api --endpoint-url http://localhost:4566/ put-public-access-block \
        --bucket static-s3-bucket \
        --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
- allow get public access on the bucket
    - aws s3api --endpoint-url http://localhost:4566/ put-bucket-policy --bucket static-s3-bucket 
        --policy file://{location_to_bucket_policy.json}

#Static Website from bucket created in console
    - `aws s3 --endpoint-url="http://localhost:4566" website "s3://static-s3-bucket" --index-document index.html --error-document index.html`
    - `aws s3 --endpoint-url="http://localhost:4566" sync ${your_folder_to_website} "s3://static-s3-bucket"`
#Create table in dynamoDB
    - `aws --endpoint-url=http://localhost:4566 dynamodb create-table --cli-input-json file://table-definition.json`
    - View Table command `aws --endpoint-url=http://localhost:4566 dynamodb scan --table-name "Music"`
#Insert items into DynamoDB table
    - `aws --endpoint-url=http://localhost:4566 dynamodb batch-write-item --request-items file://dynamodb/items.json`
#Retrieve(scan) items in DynamoDB Table
    - `aws --endpoint-url=http://localhost:4566 dynamodb scan --table-name "Music"`
#IAM Roles
    -  `aws --endpoint-url http://localhost:4566 iam create-role --role-name "aws-tut-execution-role" --assume-role-policy-document file://iam-roles/execution-role.json`
    -  `aws --endpoint-url http://localhost:4566 iam create-role --role-name "aws-tut-trust-policy" --assume-role-policy-document file://iam-roles/trust-policy.json`  
    -  `aws --endpoint-url http://localhost:4566 iam list-roles`        
#Lambda functions 
    - aws --endpoint-url http://localhost:4566 lambda create-function --function-name "aws-tut-lambda-function" --zip-file fileb://index.zip --handler 'index.handler' --runtime nodejs14.x --role aws-tut-execution-role
#Intro to CDK
 - mkdir cdk-aws-tut && cd cdk-aws-tut
 - cdklocal init sample-app --language typescript
 - typescript directly doesnot work in node js so do npm run watch
 - to see your current stack type cdklocal synth
 - save this as yml do cdklocal synth > out.yml
 - cdklocal bootstrap
 - cdklocal deploy
#Lambda function to get data from DynamoDB
#API Gateway to call lambda from static website
#Display data in static website coming from API Gateway



##AWS Lambda
- Automatic Load balancer provision by AWS
- Lambda Service Reserve pool (that contains multiple EC2 instances , load balancer chooses from these EC2 instances when the traffic is very high) (Automatically handled and complexity hidden)
- What are dynamoDB triggers?
- What are lambda edge ? Lambda destinations? Lambda Layers ? Provisioned Concurrency (Cold Start) ?
