package daggerok.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Locale;

@Controller
public class IndexPage {

    @GetMapping("/")
    public String index(final Locale locale,
                        final Model model) {

        model.addAttribute("locale", locale);
        return "index";
    }
}
