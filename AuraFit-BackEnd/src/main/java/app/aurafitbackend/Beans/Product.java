package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal price;
    private String description;
    private Category category;
    private SubCategory subCategory;
    private boolean onSale;
    private Long stockQuantity;



}
