package app.aurafitbackend.product;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "images")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String url;
    @ManyToOne
    private Product product;
}
