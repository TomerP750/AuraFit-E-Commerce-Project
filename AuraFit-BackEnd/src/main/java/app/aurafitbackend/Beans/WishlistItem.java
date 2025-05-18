package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wishlist_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer quantity;

    @ManyToOne
    private Product product;

//    @ManyToOne
//    private ProductVariant productVariant;

    @ManyToOne
    private User user;

}
