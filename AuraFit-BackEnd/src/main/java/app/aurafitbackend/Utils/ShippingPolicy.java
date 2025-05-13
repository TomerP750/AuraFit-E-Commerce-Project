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

    public BigDecimal calculate(BigDecimal subTotal) {
        return (subTotal.compareTo(FREE_THRESHOLD) > 0) ? BigDecimal.ZERO : FLAT_FEE;
    }
}
