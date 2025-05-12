package app.aurafitbackend.Beans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "product_variants")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    // TODO ask shaked if oneToMany or OneToOne
    @ManyToOne
    @JoinColumn(name = "size_id",nullable = false)
    private Size size;

    @ManyToOne
    private Color color;

    @Column(nullable = false)
    @OneToMany(mappedBy = "productVariant")
    private Set<Material> material;

    @Column(unique = true ,nullable=false)
    private UUID sku = UUID.randomUUID();

    @Column(nullable=false)
    private BigDecimal basePrice;

    @Column(nullable=false)
    private BigDecimal salePrice = BigDecimal.ZERO;

    @Column(nullable=false)
    private Integer stockQuantity;

    @Column(nullable=false)
    private Boolean onSale = false;

    @OneToMany(mappedBy = "variant")
    private List<ProductVariantImage> productImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Product product;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
