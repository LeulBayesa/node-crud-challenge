const { v4: uuidv4 } = require("uuid");

// In-memory database
let persons = [{ id: "1", name: "Sam", age: 26, hobbies: [] }];

// Function to create a new person
exports.createPerson = (name, age, hobbies = []) => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid name");
  }
  if (!age || typeof age !== "number") {
    throw new Error("Invalid age");
  }
  if (!Array.isArray(hobbies)) {
    throw new Error("Invalid hobbies");
  }

  const newPerson = { id: uuidv4(), name, age, hobbies };
  persons.push(newPerson);
  return newPerson;
};

// Function to get all persons
exports.getAllPersons = () => persons;

// Function to get a person by id
exports.getPersonById = (id) => persons.find((p) => p.id === id);

// Function to update a person by id
exports.updatePersonById = (id, updatedPerson) => {
  const person = exports.getPersonById(id);
  if (!person) {
    throw new Error("Person with such Id is not found");
  }
  Object.assign(person, updatedPerson);
  return person;
};

// Function to delete a person by id
exports.deletePersonById = (id) => {
  const index = persons.findIndex((p) => p.id === id);
  if (index !== -1) {
    persons.splice(index, 1);
  }
};
