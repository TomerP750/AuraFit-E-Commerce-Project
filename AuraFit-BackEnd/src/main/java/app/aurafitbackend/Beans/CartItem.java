package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal unitPrice;
    private Integer quantity;
    @ManyToOne
    private ProductVariant variant;
    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Cart cart;
}
