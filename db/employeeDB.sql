DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Engineering");
               


CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_id INT UNSIGNED NOT NULL,
    Index dep_id (department_id),
    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL
);
INSERT INTO role (department_id, title, salary)
VALUES (1, "Director", 100000);

INSERT INTO role (department_id, title, salary)
VALUES (2, "Manager", 75000);

INSERT INTO role (department_id, title, salary)
VALUES (3, "Associate", 50000);
      

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    Index role_id (role_id), 
    manager_id INT UNSIGNED,
    Index man_id (manager_id)
);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Melville", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Name", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Williams", 3, 1);

    -- foreign key references cascade (line14, 24 & 26)---- LOOK UP -- something along the lines of tying all the tables together
    -- will also have to do this in the role table as well
