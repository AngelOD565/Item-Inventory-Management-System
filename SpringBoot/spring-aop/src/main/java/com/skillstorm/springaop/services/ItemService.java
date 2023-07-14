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

/*
 * BELOW are our out-of-the-box Jpa methods
 */

    public List<Item> findAllItems() {
        return itemRepository.findAll();        // calls the findAll() method in JpaRepository
    }


    public Item findItemById(int id) {
        
        Optional<Item> item = itemRepository.findById(id);
        
        // if our database has a item with a matching id, return it
        if(item.isPresent()) {                  // ispresent checks if the optional returned the item
            return item.get();                  // get will retrieve the item
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

        Warehouse warehouseWithId = warehouseService.saveWarehouse(item.getWarehouse());
        item.setWarehouse(warehouseWithId);
        return itemRepository.save(item);                
    }

    public int updateName(Item item, String newName){

        return itemRepository.updateItemName(item.getId(), newName);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }

}
