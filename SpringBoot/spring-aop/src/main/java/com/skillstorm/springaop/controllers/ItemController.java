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

import com.skillstorm.springaop.services.ItemService;
import com.skillstorm.springaop.models.Item;

@RestController
@RequestMapping("/items")
@CrossOrigin                    // specifies who is allowed to make requests, it defaults to allowing everyone
public class ItemController {
    

    @Autowired
    ItemService itemService;


    @GetMapping
    public ResponseEntity<List<Item>> findAllItems() {
        List<Item> items = itemService.findAllItems();

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Item> findItemById(@PathVariable int id) {
        Item item = itemService.findItemById(id);
        return new ResponseEntity<Item>(item, HttpStatus.OK);
    }


    @GetMapping("/rarity/{rarity}")
    public ResponseEntity<List<Item>> findItemsByRating(@PathVariable int rarity) {

        List<Item> items = itemService.findItemsByRating(rarity);

        if(items == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);

    }

    /*
     * @Valid will make sure the incoming object meets all constraints defined on the model
     * 
     *      gives the error back here rather than when the record tries to be saved
     * 
     * 
     *      aka JSR-303 validation
     * 
     */

    @PostMapping("/item") 
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {         
        
        // insert the director that is provided with the item - handle this in the service
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
    }


    @PutMapping("/item") 
    public ResponseEntity<Item> updateItem(@RequestBody Item item) {
        
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.OK);
    }

    @PutMapping("/item/updateName") 
    public ResponseEntity<Integer> updateItemName(@RequestBody Item item, @RequestParam String newName) {
        
        int updated = itemService.updateName(item, newName);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/item") 
    public ResponseEntity<Item> deleteItem(@RequestBody Item item) {
        
        itemService.deleteItem(item);
        return ResponseEntity.noContent().build();
    }

}
