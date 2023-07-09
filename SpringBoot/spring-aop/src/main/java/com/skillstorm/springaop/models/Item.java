package com.skillstorm.springaop.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Table(name = "ITEMS")
public class Item {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "item_name")
    private String name;

    @Column
    @Max(5)
    @Min(1)                                 // item rarities only go from 1 (Common) to 5 (Legendary)
    private int rarity;

    @ManyToOne                              // this is the MANY side of the warehouse-item relationship
    @JoinColumn(name = "warehouse_id")       // this is a foreign key to be joined on the warehouse id
    private Warehouse warehouse;
    
    public Item() {                                             
                                                                            
    }

    
    public Item(String name, @Max(5) @Min(1) int rarity, Warehouse warehouse) {
        this.name = name;
        this.rarity = rarity;
        this.warehouse = warehouse;
    }


    public Item(int id, String name, @Max(5) @Min(1) int rarity, Warehouse warehouse) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.warehouse = warehouse;
    }



    public int getId() {
        return id;
    }



    public void setId(int id) {
        this.id = id;
    }



    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }



    public int getRarity() {
        return rarity;
    }



    public void setRarity(int rarity) {
        this.rarity = rarity;
    }



    public Warehouse getWarehouse() {
        return warehouse;
    }



    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + rarity;
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
        return result;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Item other = (Item) obj;
        if (id != other.id)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (rarity != other.rarity)
            return false;
        if (warehouse == null) {
            if (other.warehouse != null)
                return false;
        } else if (!warehouse.equals(other.warehouse))
            return false;
        return true;
    }


    @Override
    public String toString() {
        return "Item [id=" + id + ", name=" + name + ", rarity=" + rarity + ", warehouse=" + warehouse + "]";
    }





}
