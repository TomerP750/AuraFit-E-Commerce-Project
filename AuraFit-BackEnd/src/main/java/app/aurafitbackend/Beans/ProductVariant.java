package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.Color;
import app.aurafitbackend.Enums.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products_variants")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Color color;
    @Enumerated(EnumType.STRING)
    private Size size;
    private BigDecimal price;
    private Integer stockQuantity;


    @ManyToOne
    @JsonBackReference
    private Product product;
}
