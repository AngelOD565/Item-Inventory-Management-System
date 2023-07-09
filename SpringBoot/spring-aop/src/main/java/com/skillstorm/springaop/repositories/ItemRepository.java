package com.skillstorm.springaop.repositories;

import java.util.List;
import java.util.Optional;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.springaop.models.Item;


@Repository     
public interface ItemRepository extends JpaRepository<Item, Integer> {

    
    public Optional<List<Item>> findAllByRarityGreaterThanEqual(int minRarity);


    @Query("update Item i set i.name = :new_name where id = :item_id")
    @Modifying  
    @Transactional      
    public int updateItemName(@Param("item_id") int id, @Param("new_name") String newName);                   //custom query to update item name using item id

}
