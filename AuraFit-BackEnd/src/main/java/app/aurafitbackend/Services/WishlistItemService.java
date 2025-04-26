package app.aurafitbackend.Services;

import app.aurafitbackend.Repositories.WishlistItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WishlistItemService {

    private WishlistItemRepository wishlistItemRepository;

}
