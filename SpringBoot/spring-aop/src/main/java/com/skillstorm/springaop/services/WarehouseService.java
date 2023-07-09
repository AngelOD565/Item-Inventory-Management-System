package com.skillstorm.springaop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.springaop.models.Warehouse;
import com.skillstorm.springaop.repositories.WarehouseRepository;

@Service
public class WarehouseService {
    
    @Autowired
    WarehouseRepository repository;

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return repository.save(warehouse);
    }

}
