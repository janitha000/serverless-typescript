import { SQSEvent } from "aws-lambda";
import { StepFunctions } from "aws-sdk";

export const main = async (_) => {
    const users: User[] = [{ name: "Janitha", age: 32 }, { name: "Vindya", age: 31 }];
    const output = { users, length: users.length };
    console.log(output);
    return output;
}

export const mapper = async ({ users, tapOutput }) => {
    users.pop();
    const eventUsers: User[] = users;
    let newUsers = eventUsers.map(user => ({ age: user.age * 2, ...user }));
    return { users: newUsers, length: newUsers.length, tapOutput }
}

export const tap = async ({ users, length }) => {
    console.log(users);
    console.log(length);
    try {
        return "Tap step was executed"
    }
    catch (err) {
        let UserError = new Error("User error");
        throw UserError;
    }
}

export const consumeQueue = async (event: SQSEvent) => {
    console.log(JSON.stringify(event.Records[0].body));
    let body = JSON.parse(event.Records[0].body);
    const stepFunctions = new StepFunctions();

    await stepFunctions.sendTaskSuccess({
        output: JSON.stringify({ event }),
        taskToken: body.Token
    }).promise();
}

interface User {
    name: string;
    age: number;
}