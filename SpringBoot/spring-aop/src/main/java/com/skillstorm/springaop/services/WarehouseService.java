package com.skillstorm.springaop.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.springaop.models.Warehouse;
import com.skillstorm.springaop.repositories.WarehouseRepository;

@Service
public class WarehouseService {
    
    @Autowired
    WarehouseRepository warehouseRepository;


    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAll();       // calls the findAll() method in JpaRepository

    }

    public Warehouse findWarehouseById(int id) {
        
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);
        
        // if our database has a item with a matching id, return it
        if(warehouse.isPresent()) {             // ispresent checks if the optional returned the item
            return warehouse.get();             // get will retrieve the item
        }

        //otherwise return null
        return null;
    }


    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public int updateWarehouseName(Warehouse warehouse, String newName){

        return warehouseRepository.updateWarehouseName(warehouse.getId(), newName);
    }

    public void deleteWarehouse(Warehouse warehouse) {
        warehouseRepository.delete(warehouse);
    }


}
