package daggerok.web

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import java.util.*

@Controller
class IndexPage {

  @GetMapping("/")
  fun index(locale: Locale, model: Model): String {
    model.addAttribute("locale", locale)
    return "index"
  }
}
