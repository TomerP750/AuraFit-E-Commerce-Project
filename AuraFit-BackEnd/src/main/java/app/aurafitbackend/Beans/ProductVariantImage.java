package app.aurafitbackend.Beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_variants_images")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductVariantImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String imageUrl;

    @ManyToOne
    @JsonIgnore
    private ProductVariant variant;
}
