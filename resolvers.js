const bcrypt = require('bcryptjs');
const User = require('./User');
const Employee = require('./Emplyoee');

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      return "Login successful!";
    },
    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployeeById: async (_, { eid }) => {
      return await Employee.findById(eid);
    },
    searchEmployee: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    }
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password: hashedPassword });
      return await user.save();
    },
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      return await employee.save();
    },
    updateEmployee: async (_, { eid, ...updates }) => {
      return await Employee.findByIdAndUpdate(eid, updates, { new: true });
    },
    deleteEmployee: async (_, { eid }) => {
      await Employee.findByIdAndRemove(eid);
      return "Employee deleted successfully";
    }
  }
};

module.exports = resolvers;
