package app.aurafitbackend.Controllers;

import app.aurafitbackend.Beans.Size;
import app.aurafitbackend.Services.SizeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/size")
@AllArgsConstructor
public class SizeController {

    private final SizeService sizeService;


    @PostMapping("/add")
    public void addSize(@RequestBody Size size) {
        sizeService.addSize(size);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSize(@PathVariable Long id) {
        sizeService.deleteSize(id);
    }

}
