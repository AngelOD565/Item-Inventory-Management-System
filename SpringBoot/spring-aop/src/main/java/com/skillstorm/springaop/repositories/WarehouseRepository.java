package com.skillstorm.springaop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.springaop.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer>{

    @Query("update Warehouse w set w.warehouseName = :new_name where id = :warehouse_id")
    @Modifying  
    @Transactional      
    public int updateWarehouseName(@Param("warehouse_id") int id, @Param("new_name") String newName);                   //custom query to update item name using item id
    
}
