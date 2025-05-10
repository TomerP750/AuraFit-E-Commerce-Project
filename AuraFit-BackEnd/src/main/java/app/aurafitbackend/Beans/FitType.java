package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fit_types")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

/**
 *
 * this uses a table for get a fit for clothing type so if the productvariant is clothing
 * get SLIMFIT REGULARFIT etc..
 * for socks - ankle socks long socks etc...
 */

public class FitType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private String name;

    @ManyToOne
    private ProductType productType;

}
