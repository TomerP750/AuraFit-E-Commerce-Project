package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Category;
import app.aurafitbackend.Enums.SubCategory;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
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
    @Setter(AccessLevel.NONE)
    private Long id;
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Category category;
    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;

    private Boolean onSale;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductVariant> variants = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;




}
