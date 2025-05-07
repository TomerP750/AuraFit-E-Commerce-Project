package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/display")
@AllArgsConstructor
public class DisplayController {

    private final ProductVariantService productVariantService;


    @GetMapping("/product/reviews/{id}")
    public List<Review> productReviews(@PathVariable Long id) {
        return productVariantService.getProductVariantReviews(id);
    }

    @GetMapping("/product/{id}")
    public ProductVariantDTO productVariant(@PathVariable Long id) {
        return productVariantService.oneProductVariant(id);
    }

//    @GetMapping("/men/clothing")
//    public List<ProductVariantDTO> menClothing() {
//        return productVariantService.getAllMensClothing();
//    }
//
//    @GetMapping("/women/clothing")
//    public List<ProductVariantDTO> womenClothing() {
//        return productVariantService.getAllWomensClothing();
//    }



}
