package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "carts")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal totalPrice;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "cart")
    private List<CartItem> items;


}
