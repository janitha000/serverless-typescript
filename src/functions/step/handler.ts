
export const main = async (event) => {
    const users: User[] = [{ name: "Janitha", age: 32 }, { name: "Vindya", age: 31 }];
    const output = { users, length: users.length };
    console.log(output);
    return output;
}

export const mapper = async (event) => {
    console.log(event)
    const user = event.users.pop();
    const eventUsers: User[] = event.users;
    let users = eventUsers.map(user => ({ age: user.age * 2, ...user }));
    return { users, length: event.users.length }
}

export const tap = async (event) => {
    console.log(event);
    return { users: event.users, length: event.users.length }
}

interface User {
    name: string;
    age: number;
}