package app.aurafitbackend.Utils;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Data
@Component
public class ShippingPolicy {
    private static final BigDecimal FREE_THRESHOLD = BigDecimal.valueOf(75);
    private static final BigDecimal FLAT_FEE     = BigDecimal.valueOf(10);

    public ShippingPolicy() {
    }

    public BigDecimal calculate(BigDecimal itemsTotal) {
        if (itemsTotal == null || itemsTotal.compareTo(BigDecimal.ZERO) == 0) {
            // nothing to ship when cart is empty
            return BigDecimal.ZERO;
        }
        // free shipping at or above the threshold
        if (itemsTotal.compareTo(FREE_THRESHOLD) >= 0) {
            return BigDecimal.ZERO;
        }
        // otherwise charge the flat fee
        return FLAT_FEE;
    }

}
