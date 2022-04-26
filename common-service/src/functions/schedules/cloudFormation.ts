import { getFormationDetails } from 'src/common/cloudFormation';
import { apiResponse } from 'src/common/apiResponse';


export const getCloudFormationOutput = async () => {
    let output = await getFormationDetails();
    const exports = output.Stacks[0].Outputs;
    const funcArn = exports.find(x => x.OutputKey === "ScheduledLambdaFunctionQualifiedArn")
    return apiResponse._200({ funcArn });
}