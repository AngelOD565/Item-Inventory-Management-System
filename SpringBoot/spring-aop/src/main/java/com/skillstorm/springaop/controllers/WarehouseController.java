package com.skillstorm.springaop.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.springaop.models.Warehouse;
import com.skillstorm.springaop.services.WarehouseService;

@RestController
@RequestMapping("/warehouses")
@CrossOrigin
public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {                     //mapping retrieval of all warehouses for our warehouse table
        List<Warehouse> warehouses = warehouseService.findAllWarehouses();

        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}")                                                   //mapping retrieval of warehouse id's for our warehouse table
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable int id) {
        Warehouse warehouse = warehouseService.findWarehouseById(id);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }

    @PostMapping("/warehouse")                                                       //mapping creation for our warehouse table
    public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {         
        
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
    }
    @PutMapping("/warehouse")                                                        //mapping updates for our warehouse table
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);
    }


    @PutMapping("/warehouse/updateName")                                             //mapping updates to our warehouse names for our warehouse table
    public ResponseEntity<Integer> updateWarehouseName(@RequestBody Warehouse warehouse, @RequestParam String newName) {
        
        int updated = warehouseService.updateWarehouseName(warehouse, newName);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/warehouse")                                                     //mapping deletion for our warehouse table
    public ResponseEntity<Warehouse> deleteWarehouse(@RequestBody Warehouse warehouse) {
        
        warehouseService.deleteWarehouse(warehouse);
        return ResponseEntity.noContent().build();
    }
    
}
