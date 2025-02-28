import { faker } from "@faker-js/faker";
const updatedData = {
    username: faker.person.firstName() + Math.ceil(Math.random() * 1000),
    password: faker.internet.password(),
    bio: faker.lorem.word(),
    email: faker.internet.email().toLowerCase()
};
export default updatedData;