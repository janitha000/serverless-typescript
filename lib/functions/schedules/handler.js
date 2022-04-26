import { CloudWatchEvents } from 'aws-sdk';
import { getFormationDetails } from 'src/common/cloudFormation';
import { apiResponse } from 'src/common/apiResponse';
export const scheduledMain = async (event, _context, callback) => {
    console.log(event);
    callback(null);
};
export const scheduledVar = async (event, _, callback) => {
    console.log(event);
    callback(null);
};
export const createSchedule = async (_) => {
    const cwevents = new CloudWatchEvents({ apiVersion: '2015-10-07' });
    var params = {
        Name: 'DEMO_EVENT',
        ScheduleExpression: 'rate(1 minute)',
        State: 'ENABLED',
    };
    var targetParams = {
        Rule: 'DEMO_EVENT',
        Targets: [
            {
                Arn: 'arn:aws:lambda:ap-southeast-1:628640267234:function:serverless-typescript-dev-scheduled',
                Id: 'myCloudWatchEventsTarget',
                Input: "{\"key\":\"this is from the sdk\"}",
            }
        ]
    };
    cwevents.putRule(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.RuleArn);
            cwevents.putTargets(targetParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    console.log("Success", data);
                }
            });
        }
    });
};
export const getCloudFormationOutput = async () => {
    let output = await getFormationDetails();
    const exports = output.Stacks[0].Outputs;
    const funcArn = exports.find(x => x.OutputKey === "ScheduledLambdaFunctionQualifiedArn");
    return apiResponse._200({ funcArn });
};
//# sourceMappingURL=handler.js.map