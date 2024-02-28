package com.example.demo.controllers;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RequestMapping("/product")
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getProducts(){return productRepository.findAll();}

    @PostMapping
    public void createProduct(@RequestBody Product product){productRepository.save(product);}

    @GetMapping(path = "{id}")
    public Optional<Product> getProduct(@PathVariable("id")Long id){return productRepository.findById(id);}

    @PutMapping
    public void updateProduct (@RequestBody Product product){productRepository.save(product);}

    @DeleteMapping(path = "{id}")
    public void deleteProduct(@PathVariable("id") Long id){productRepository.deleteById(id);}


}
