package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Gender;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)

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

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    //    @OneToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // CLOTHING FOOTWEAR

    //    @OneToOne
    @ManyToOne
    @JoinColumn(name = "product_type_id", nullable = false)
    private ProductType productType; // TSHIRT SHOES

    private Boolean onSale;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductVariant> variants = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews = new ArrayList<>();

}
