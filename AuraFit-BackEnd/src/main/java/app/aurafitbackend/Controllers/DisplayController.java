package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.ProductVariant;
import app.aurafitbackend.Beans.Review;
import app.aurafitbackend.Beans.WishlistItem;
import app.aurafitbackend.DTOS.DisplayDTOS.ProductVariantDTO;
import app.aurafitbackend.Enums.Gender;
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
    private final ProductService productService;
    private final WishlistItemService wishlistItemService;


    @GetMapping("/product/reviews/{id}")
    public List<Review> productReviews(@PathVariable Long id) {
        return productVariantService.getProductVariantReviews(id);
    }

    @GetMapping("/product/{id}")
    public ProductVariantDTO productVariant(@PathVariable Long id) {
        return productVariantService.oneProductVariant(id);
    }

    @GetMapping("/product/rating/avg/{id}")
    public int getProductRatingAvg(@PathVariable Long id) {
        return productService.getProductReviewsAverage(id);
    }


    @GetMapping("/clothing/{gender}")
    public List<ProductVariant> allClothing(@PathVariable Gender gender) {
        return productVariantService.allClothingByGender(gender);
    }


    @GetMapping("/variant/{id}")
    public ProductVariant oneVariant(@PathVariable Long id) {
        return productVariantService.getProductVariant(id);
    }







}
