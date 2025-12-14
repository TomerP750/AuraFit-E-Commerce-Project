package app.aurafitbackend.order;

import app.aurafitbackend.Beans.ContactInformation;
import app.aurafitbackend.user.User;
import app.aurafitbackend.Enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private BigDecimal subTotal;
    private BigDecimal shippingCost;
    private BigDecimal totalPrice;
    private String orderNumber;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
    @ManyToOne
    private User user;
    private LocalDateTime orderDate;
    @Enumerated(EnumType.STRING)
    private Status status;

    @Embedded
    private ContactInformation contactInformation;

//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    private PaymentDetail paymentDetails;


}
