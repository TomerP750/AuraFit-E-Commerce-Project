package app.aurafitbackend.Controllers;

import app.aurafitbackend.Services.ProductVariantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/variant")
@AllArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;







}
