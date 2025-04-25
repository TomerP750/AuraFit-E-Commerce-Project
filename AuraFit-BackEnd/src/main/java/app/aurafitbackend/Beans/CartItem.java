package app.aurafitbackend.Beans;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cartitems")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal unitPrice;
    private Integer quantity;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Cart cart;
}
