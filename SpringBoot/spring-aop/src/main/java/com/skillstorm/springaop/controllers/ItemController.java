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
@CrossOrigin                    // left blank to allow everyone access (not very good practice)
public class ItemController {
    

    @Autowired
    ItemService itemService;


    @GetMapping
    public ResponseEntity<List<Item>> findAllItems() {                                          //mapping retrieval of all items for our item table
        List<Item> items = itemService.findAllItems();

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }

    @GetMapping("/item/{id}")                                                                   //mapping retrieval of item id's for our item table
    public ResponseEntity<Item> findItemById(@PathVariable int id) {
        Item item = itemService.findItemById(id);
        return new ResponseEntity<Item>(item, HttpStatus.OK);
    }


    @GetMapping("/rarity/{rarity}")                                                             //mapping retrieval of item rarities for our item table
    public ResponseEntity<List<Item>> findItemsByRating(@PathVariable int rarity) {

        List<Item> items = itemService.findItemsByRating(rarity);

        if(items == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);

    }


    @PostMapping("/item")                                                       //mapping creation for our item table
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {         
        
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
    }


    @PutMapping("/item")                                                        //mapping updates for our item table
    public ResponseEntity<Item> updateItem(@RequestBody Item item) {
        
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.OK);
    }

    @PutMapping("/item/updateName")                                                                             //mapping updates to our item names for our item table
    public ResponseEntity<Integer> updateItemName(@RequestBody Item item, @RequestParam String newName) {
        
        int updated = itemService.updateName(item, newName);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/item")                                                     //mapping deletion for our item table
    public ResponseEntity<Item> deleteItem(@RequestBody Item item) {
        
        itemService.deleteItem(item);
        return ResponseEntity.noContent().build();
    }

}
