package app.aurafitbackend.display;

import app.aurafitbackend.category.CategoryService;
import app.aurafitbackend.color.Color;
import app.aurafitbackend.product.ProductDTO;
import app.aurafitbackend.productVariant.ProductVariantDTO;
import app.aurafitbackend.size.SizeDTO;
import app.aurafitbackend.Enums.Gender;
import app.aurafitbackend.category.CategoryRepository;
import app.aurafitbackend.size.SizeRepository;
import app.aurafitbackend.category.Category;
import app.aurafitbackend.color.ColorService;
import app.aurafitbackend.product.ProductService;
import app.aurafitbackend.productType.ProductType;
import app.aurafitbackend.productType.ProductTypeService;
import app.aurafitbackend.productVariant.ProductVariant;
import app.aurafitbackend.productVariant.ProductVariantService;
import app.aurafitbackend.review.Review;
import app.aurafitbackend.size.Size;
import app.aurafitbackend.size.SizeService;
import app.aurafitbackend.wishlist.WishlistItemService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/display")
@AllArgsConstructor
public class DisplayController {

    private final ProductVariantService productVariantService;
    private final ProductService productService;
    private final WishlistItemService wishlistItemService;
    private final SizeService sizeService;
    private final ColorService colorService;
    private final SizeRepository sizeRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final ProductTypeService productTypeService;


    @GetMapping("/product/filter")
    public Page<ProductDTO> filterProducts(
            @RequestParam(required = false) List<Long> sizeIds,
            @RequestParam(required = false) List<Long> colorIds,
            Pageable pageable
    ) {
        return productService.filter(sizeIds, colorIds, pageable);
    }

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

    @GetMapping("/variants/byProductId/{id}")
    public List<ProductVariant> allVariantsByProductId(@PathVariable Long id) {
        return productVariantService.getProductVariantsByProductId(id);
    }

    @GetMapping("/variants/sizesByProductTypeId/{id}")
    public List<Size> allSizesByProductTypeId(@PathVariable Long id) {
        return sizeService.getSizesByProductType(id);
    }

    @GetMapping("/variants/sizes/test/{id}")
    public List<SizeDTO> allSizesTest(@PathVariable Long id) {
        return sizeService.getSizesByProductTypeTest(id);
    }

    @GetMapping("/variants/latestItems")
    public List<ProductVariantDTO> allLatestVariants() {
        return productVariantService.getLatestVariants();
    }

    @GetMapping("/color/{productId}/all")
    public List<Color> allColorsByProductId(@PathVariable Long productId) {
        return colorService.allProductAvailableSizes(productId);
    }

    @GetMapping("/color/all")
    public List<Color> allColors() {
        return colorService.getAllColors();
    }

    @GetMapping("/size/all")
    public List<Size> allSizesByProductType() {
        return sizeService.allSizes();
    }

    @GetMapping("productType/all")
    public List<ProductType> allProductTypes() {
        return productTypeService.getAllProductTypes();
    }

    @GetMapping("/category/all")
    public List<Category> allCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/product/{gender}/all")
    public Page<ProductDTO> allProductsByGender(@PathVariable Gender gender,
                                                @RequestParam(value = "page", defaultValue = "0") int page,
                                                @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProductsByGender(gender, pageable);
    }







}
