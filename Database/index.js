import { createRequire } from "module";
const require = createRequire(import.meta.url);

const courses = require("./courses.json");
const modules = require("./modules.json");
const assignments = require("./assignments.json");
const users = require("./users.json");
const grades = require("./grades.json");
const enrollments = require("./enrollments.json");

const data = {
  courses,
  modules,
  assignments,
  users,
  grades,
  enrollments,
};

export default data;



