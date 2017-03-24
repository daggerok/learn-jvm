package daggerok.web

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class IndexPage {

  @GetMapping("/")
  def index(Locale locale, Model model) {

    model.addAttribute("locale", locale)
    "index"
  }
}
