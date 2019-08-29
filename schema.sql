drop database if exists bamazon;
create database bamazon;
use bamazon;

create table items(
    id int not null auto_increment,
    productName varchar(60) not null,
    departmentName varchar(60),
    price decimal(5,2) not null default 0.00,
    stock int not null default 0,
    primary key(id)
);