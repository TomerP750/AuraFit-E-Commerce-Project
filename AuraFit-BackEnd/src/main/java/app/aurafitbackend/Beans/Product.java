package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
/**
 * i use it to generalize ProductVariants so i dont have duplicates with description, categories, etc..
 *
 *
 *
 *
 */
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Category category;
    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductVariant> variants = new ArrayList<>();




}
