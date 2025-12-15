package app.aurafitbackend.productType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_types")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String name;
    //TODO add manytoone to category

}
