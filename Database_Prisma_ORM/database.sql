-- Active: 1692670144809@@127.0.0.1@3306@belajar_nodejs_database

CREATE TABLE
    sample (
        id VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    ) engine InnoDB;

SELECT * FROM sample;

CREATE TABLE
    customers (
        id VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT customers_email_unique UNIQUE (email),
        CONSTRAINT customers_phone_unique UNIQUE (phone)
    ) engine InnoDB;

SELECT * FROM customers;

create table
    products (
        id varchar(100) not null,
        name varchar(100) not null,
        price int not null,
        stock int not null,
        category varchar(100) not null,
        primary key (id)
    ) engine innodb;

select * from products;

insert into
    products(id, name, price, stock, category) value ('P0001', 'A', 1000, 100, 'K1'), ('P0002', 'B', 2000, 200, 'K1'), ('P0003', 'C', 3000, 300, 'K1'), ('P0004', 'D', 4000, 400, 'K1'), ('P0005', 'E', 5000, 500, 'K1');

insert into
    products(id, name, price, stock, category) value ('P0006', 'A', 1000, 100, 'K2'), ('P0007', 'B', 2000, 200, 'K2'), ('P0008', 'C', 3000, 300, 'K2'), ('P0009', 'D', 4000, 400, 'K2'), ('P0010', 'E', 5000, 500, 'K2');

create table
    categories (
        id int not null auto_increment,
        name varchar(100) not null,
        primary key (id)
    ) engine innodb;

select * from categories;

create table
    wallet (
        id varchar(100) not null,
        balance int not null,
        customer_id varchar(100) not null,
        primary key (id),
        constraint wallet_customer_id_fk foreign key (customer_id) references customers (id),
        constraint wallet_customer_id_unique unique (customer_id)
    ) engine innodb;

select * from wallet;

create table
    comments (
        id int not null auto_increment,
        customer_id varchar(100) not null,
        title varchar(100) not null,
        description text,
        primary key (id),
        constraint comments_customer_id_fk foreign key (customer_id) references customers (id)
    ) engine InnoDB;

select * FROm comments;

insert into
    comments(
        customer_id,
        title,
        description
    )
values (
        'mamun',
        'Comment 1',
        'Sample comment 1'
    ), (
        'mamun',
        'Comment 2',
        'Sample comment 2'
    ), (
        'budi',
        'Comment 1',
        'Sample comment 1'
    ), (
        'budi',
        'Comment 3',
        'Sample comment 3'
    );

select * From comments;

create table
    likes (
        customer_id varchar(100) not null,
        product_id varchar(100) not null,
        primary key (customer_id, product_id),
        constraint likes_customer_id_fk foreign key (customer_id) references customers (id),
        constraint likes_product_id_fk foreign key (product_id) references products (id)
    ) engine innodb;

SELECT * FROM likes;

create table
    _loves (
        A varchar(100) not null,
        B varchar(100) not null,
        primary key (A, B),
        constraint customer_loves_fk foreign key (A) references customers (id),
        constraint product_loves_fk foreign key (B) references products (id)
    ) engine innodb;

CREATE DATABASE belajar_nodejs_prisma;

USE belajar_nodejs_prisma;

SHOW TABLES;

DESC sample 

SELECT * FROM _prisma_migrations;

DESC sample;

ALTER TABLE sample ADD COLUMN full_description TEXT;