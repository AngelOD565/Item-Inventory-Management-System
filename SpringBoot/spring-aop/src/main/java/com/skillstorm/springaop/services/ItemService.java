package com.skillstorm.springaop.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.springaop.models.Item;
import com.skillstorm.springaop.models.Warehouse;
import com.skillstorm.springaop.repositories.ItemRepository;

@Service
public class ItemService {
    
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    WarehouseService warehouseService;


    public List<Item> findAllItems() {
        return itemRepository.findAll();       // calls the findAll() method in JpaRepository
    }


    public Item findItemById(int id) {
        
        Optional<Item> item = itemRepository.findById(id);
        
        // if our database has a item with a matching id, return it
        if(item.isPresent()) {             // ispresent checks if the optional returned the object
            return item.get();             // get will retrieve the object
        }

        //otherwise return null
        return null;
    }

    public List<Item> findItemsByRating(int rarity) {
        
        Optional<List<Item>> items = itemRepository.findAllByRarityGreaterThanEqual(rarity);

        if(items.isPresent()) {
            return items.get();
        }

        return null;
    }

    public Item saveItem(Item item) {

        /*
         * save performs an isNew() check using your primary key
         */


        Warehouse warehouseWithId = warehouseService.saveWarehouse(item.getWarehouse());
        item.setWarehouse(warehouseWithId);
        return itemRepository.save(item);                // comes OOTB with jpa respository
    }

    public int updateName(Item item, String newName){

        return itemRepository.updateItemName(item.getId(), newName);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }

}
