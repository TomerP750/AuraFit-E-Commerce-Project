package app.aurafitbackend.product;

import app.aurafitbackend.productVariant.ProductVariant;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecifications {


    public static Specification<Product> hasVariantWithSizeIdsOrColorIds(List<Long> sizeIds, List<Long> colorIds) {
        return (root, query, cb) -> {
            boolean hasSizes = sizeIds != null && !sizeIds.isEmpty();
            boolean hasColors = colorIds != null && !colorIds.isEmpty();

            if (!hasSizes && !hasColors) return cb.conjunction();

            query.distinct(true);

            Join<Product, ProductVariant> v = root.join("variants", JoinType.INNER); // <-- use your field name

            List<Predicate> ors = new ArrayList<>();

            if (hasSizes) {
                ors.add(v.get("size").get("id").in(sizeIds));
            }
            if (hasColors) {
                ors.add(v.get("color").get("id").in(colorIds));
            }

            return cb.or(ors.toArray(new Predicate[0]));
        };
    }
}



