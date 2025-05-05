package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.ClothingFitType;
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
 *
 */

public class FitType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @OneToOne
    private ProductVariant productVariant;

    @Enumerated(EnumType.STRING)
    private ClothingFitType fitType;
}
