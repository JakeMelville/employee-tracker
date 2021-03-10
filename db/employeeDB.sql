DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
INSERT INTO department (name)
VALUES ("Science");

INSERT INTO department (name)
VALUES ("Developer");

INSERT INTO department (name)
VALUES ("Engineer");
               


CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_id INT UNSIGNED NOT NULL,
    Index dep_id (department_id),
    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    Index role_id (role_id), 
    manager_id INT UNSIGNED,
    Index man_id (manager_id)
)

    -- foreign key references cascade (line14, 24 & 26)---- LOOK UP -- something along the lines of tying all the tables together
    -- will also have to do this in the role table as well
