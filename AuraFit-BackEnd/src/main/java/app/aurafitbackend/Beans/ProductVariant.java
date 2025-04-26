package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Color;
import app.aurafitbackend.Enums.Material;
import app.aurafitbackend.Enums.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "products_variants")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(nullable=false)
    private UUID sku = UUID.randomUUID();

    @Column(nullable=false)
    private BigDecimal price;

    @Column(nullable=false)
    private Integer stockQuantity;

    @Column(nullable=false)
    private Boolean onSale;

    @OneToMany(mappedBy = "variant")
    private List<ProductVariantImage> productImages;

    @ElementCollection
    @CollectionTable(
            name = "variant_attributes",
            joinColumns = @JoinColumn(name = "variant_id")
    )
    @MapKeyColumn(name = "attr_key")
    @Column(name = "attr_value")
    private Map<String,String> attributes;

    @ManyToOne
    @JsonBackReference
    private Product product;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
