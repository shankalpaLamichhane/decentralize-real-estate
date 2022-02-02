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