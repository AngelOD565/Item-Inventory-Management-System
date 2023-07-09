package com.skillstorm.springaop.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity                                     
@Table(name = "WAREHOUSES")                  // Warehouse class maps to WAREHOUSES table in database
public class Warehouse {
    
    @Id                                     
    @Column                                 
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // Serial ID column
    private int id;

    @Column(name = "warehouse_name")
    private String warehouseName;

    // specifies this is the ONE sideof the relatonship
    @JsonBackReference      
    @OneToMany(targetEntity = Item.class, mappedBy = "warehouse")   // one-to-many side of warehouse-item relationship
    private Set<Item> items;

    public Warehouse() {
        
    }

    public Warehouse(String warehouseName) {                                       //constructors and our getter/setter methods
        this.warehouseName = warehouseName;
    }

    public Warehouse(String warehouseName, Set<Item> items) {
        this.warehouseName = warehouseName;
        this.items = items;
    }

    public Warehouse(int id, String warehouseName, Set<Item> items) {
        this.id = id;
        this.warehouseName = warehouseName;
        this.items = items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

 
    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    @Override
    public int hashCode() {                                                                         //hashCode() method
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((warehouseName == null) ? 0 : warehouseName.hashCode());
        result = prime * result + ((items == null) ? 0 : items.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {                                                             //equals() method
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Warehouse other = (Warehouse) obj;
        if (id != other.id)
            return false;
        if (warehouseName == null) {
            if (other.warehouseName != null)
                return false;
        } else if (!warehouseName.equals(other.warehouseName))
            return false;
        if (items == null) {
            if (other.items != null)
                return false;
        } else if (!items.equals(other.items))
            return false;
        return true;
    }

    @Override
    public String toString() {                                                                              //toString() method
        return "Warehouse [id=" + id + ", warehouseName=" + warehouseName + ", items=" + items + "]";
    }

 
}
