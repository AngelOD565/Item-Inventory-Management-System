

/* If the items or warehouses table already exists, drop it so it can be remade */

drop table if exists ITEMS;
drop table if exists WAREHOUSES;

create table WAREHOUSES (
	id serial PRIMARY KEY,
	warehouse_name VARCHAR(50)
);

create table ITEMS (
	id serial PRIMARY KEY,
	item_name VARCHAR(50),
	rarity INT,
	warehouse_id INT,
	FOREIGN KEY (warehouse_id) REFERENCES WAREHOUSES(id)
);
