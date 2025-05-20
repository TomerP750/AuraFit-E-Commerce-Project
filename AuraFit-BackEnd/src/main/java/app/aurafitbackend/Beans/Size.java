package app.aurafitbackend.Beans;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "sizes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String size;
    //TODO change to manytomany
    @ManyToOne(fetch = FetchType.EAGER)
    private ProductType productType;


}
