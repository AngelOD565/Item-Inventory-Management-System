

/*

    if you need to populate your own postgres database with warehouses to hold magical items, use the following query:
    
*/ 

/* make sure to insert WAREHOUSES first */
insert into WAREHOUSES (warehouse_name) values ('South');
insert into WAREHOUSES (warehouse_name) values ('North');
insert into WAREHOUSES (warehouse_name) values ('East');
insert into WAREHOUSES (warehouse_name) values ('West');
insert into WAREHOUSES (warehouse_name) values ('Main');

insert into ITEMS (item_name, rarity, warehouse_id) values ('Potion of Healing', 1, 2);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Rope of Climbing', 1, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Bag of Holding', 2, 2);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Ring of Protection', 2, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Cloak of Elvenkind', 1, 2);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Staff of the Python', 3, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Boots of Striding and Springing', 2, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Amulet of Health', 1, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Gauntlets of Power', 3, 3);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Cloak of Protection', 2, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Mantle of Spell Resistance', 3, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Boots of Levitation', 4, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Cloak of Displacement', 2, 5);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Belt of Strength', 3, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Holy Avenger', 5, 3);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Robe of the Archmagi', 4, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Tome of Leadership and Influence', 2, 5);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Horn of Valhalla', 5, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Luck Blade', 4, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Staff of the Magi', 2, 2);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Vorpal Sword', 5, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Deck of Many Things', 5, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Eye of Vecna', 4, 1);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Rusty Dagger', 1, 4);
insert into ITEMS (item_name, rarity, warehouse_id) values ('Dragon Scale Mail', 3, 2);

