const Person = require("../models/person.model.js"); // In-Memory Database model

// to create a new person
exports.createPerson = (req, res) => {
  try {
    const { name, age, hobbies } = req.body;
    const newPerson = Person.createPerson(name, age, hobbies);
    res.status(201).json({
      message: "Person created successfully",
      data: newPerson,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// to get all persons or a person by id
exports.getPersons = (req, res) => {
  const { id } = req.params;

  if (id) {
    const person = Person.getPersonById(id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: "Person with such Id is not found" });
    }
  } else {
    const persons = Person.getAllPersons();
    res.status(200).json({
      Persons: persons,
    });
  }
};

// to update an existing person by id
exports.updatePerson = (req, res) => {
  const { id } = req.params;
  const { name, age, hobbies } = req.body;
  try {
    const updatedPerson = Person.updatePersonById(id, { name, age, hobbies });
    res.status(200).json({
      message: "Person updated successfully",
      data: updatedPerson,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// to delete a person by id

exports.deletePerson = (req, res) => {
  const { id } = req.params;
  try {
    const person = Person.getPersonById(id);
    if (!person) {
      return res
        .status(404)
        .json({ message: "Person with such Id is not found" });
    }
    Person.deletePersonById(id);
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the person" });
  }
};
