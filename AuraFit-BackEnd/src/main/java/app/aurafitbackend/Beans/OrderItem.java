package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "orderitems")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private BigDecimal totalPrice;
    private BigDecimal unitPrice;
    private Integer quantity;

    @ManyToOne
    private ProductVariant variant;
    @ManyToOne
    private Order order;
//    @ManyToOne
//    private User user;
}
