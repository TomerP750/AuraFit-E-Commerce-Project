package app.aurafitbackend.Controllers;

import app.aurafitbackend.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final CategoryService categoryService;
    private final SubCategoryService subCategoryService;
    private final ProductService productService;
    private final UserService userService;
    private final ReviewService reviewService;
    private final PromotionService promotionService;
    private final ProductVariantService productVariantService;


}
