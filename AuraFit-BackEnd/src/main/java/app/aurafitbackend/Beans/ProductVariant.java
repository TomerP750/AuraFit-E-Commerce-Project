package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Color;
import app.aurafitbackend.Enums.Material;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products_variants")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "size_id",nullable = false)
    private Size size;

    @Column(nullable = false)
    private Color color;

    @Column(nullable = false)
    private Material material;

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

    @ManyToOne
    @JsonBackReference
    private Product product;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
