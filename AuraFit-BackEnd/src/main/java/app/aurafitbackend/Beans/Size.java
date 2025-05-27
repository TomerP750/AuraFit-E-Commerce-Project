package app.aurafitbackend.Beans;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sizes")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String size;
    //TODO change to manytomany
    @ManyToMany(fetch = FetchType.EAGER)
    private List<ProductType> productType = new ArrayList<>();


}
