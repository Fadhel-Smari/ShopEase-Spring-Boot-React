package com.shopease.backend.controller;

/**
 * Contrôleur REST pour la gestion des catégories de produits.
 *
 * Ce contrôleur permet de récupérer, créer et supprimer des catégories.
 * Les opérations de création et suppression sont réservées aux administrateurs.
 *
 * Toutes les routes définies ici sont accessibles à l'URL de base : /api/categories
 *
 * @author Fadhel Smari
 */

import com.shopease.backend.entity.Category;
import com.shopease.backend.service.CategoryService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    /**
     * Récupère toutes les catégories disponibles.
     *
     * @return une liste de toutes les catégories enregistrées
     */
    @GetMapping
    public List<Category> getAll() {
        return service.getAll();
    }

    /**
     * Récupère une catégorie par son identifiant.
     *
     * @param id l'identifiant de la catégorie à récupérer
     * @return un Optional contenant la catégorie si elle existe
     */
    @GetMapping("/{id}")
    public Optional<Category> getById(@PathVariable Long id) {
        return service.getById(id);
    }

    /**
     * Crée une nouvelle catégorie.
     *
     * Cette opération est protégée : seul un utilisateur avec le rôle ADMIN peut y accéder.
     *
     * @param category l'objet Category à enregistrer
     * @return la catégorie créée
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Category create(@RequestBody Category category) {
        return service.save(category);
    }

    /**
     * Supprime une catégorie par son identifiant.
     *
     * Cette opération est protégée : seul un utilisateur avec le rôle ADMIN peut y accéder.
     *
     * @param id l'identifiant de la catégorie à supprimer
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
