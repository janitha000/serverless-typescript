import { CloudFormation } from 'aws-sdk';
export const getFormationDetails = async () => {
    var params = {
        StackName: 'serverless-typescript-dev'
    };
    var cloudformation = new CloudFormation();
    const output = await cloudformation.describeStacks(params).promise();
    console.log(output);
    return output;
};
//# sourceMappingURL=cloudFormation.js.map