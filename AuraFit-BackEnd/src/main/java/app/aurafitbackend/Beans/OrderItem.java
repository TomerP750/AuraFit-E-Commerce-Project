package app.aurafitbackend.Beans;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "orderitems")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal unitPrice;
    private Integer quantity;

    @ManyToOne
    private ProductVariant variant;
    @ManyToOne
    private Order order;
}
