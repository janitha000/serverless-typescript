import { CloudFormation } from 'aws-sdk';

export const getFormationDetails = async (): Promise<CloudFormation.DescribeStacksOutput> => {
    var params = {
        StackName: 'serverless-typescript-dev' /* required */
    };

    var cloudformation = new CloudFormation();

    const output = await cloudformation.describeStacks(params).promise();
    console.log(output);
    return output;
}