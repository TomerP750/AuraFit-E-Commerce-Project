package app.aurafitbackend.promotion;

import app.aurafitbackend.productVariant.ProductVariant;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "promotions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String name;
    private Integer discountPercent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean isActive = false;
    @ManyToOne
    private ProductVariant productVariant;


}
