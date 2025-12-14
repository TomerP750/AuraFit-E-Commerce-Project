package app.aurafitbackend.cart;

import app.aurafitbackend.user.User;
import app.aurafitbackend.Enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts"
//uniqueConstraints = @UniqueConstraint(
//        name  = "uc_user_status",
//        columnNames = {"user_id", "status"}
//)
)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal shippingCost;
    private BigDecimal subTotal;
    private BigDecimal totalCartPrice;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    private User user;
    @Column(name = "cart_token", length = 36, unique = true)
    private String cartToken;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<CartItem> items = new ArrayList<>();


}
