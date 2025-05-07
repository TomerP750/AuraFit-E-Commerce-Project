package app.aurafitbackend.Controllers;

import app.aurafitbackend.Services.FitTypeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fittype")
@AllArgsConstructor
public class FitTypeController {

    private final FitTypeService fitTypeService;



}
