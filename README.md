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