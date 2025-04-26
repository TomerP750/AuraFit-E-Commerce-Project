package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wishlist_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    private ProductVariant productVariant;

    @ManyToOne
    private User user;

}
