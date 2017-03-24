package daggerok.web

import java.util.Locale

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class IndexPage {

  @GetMapping(Array("/"))
  def index(locale: Locale, model: Model): String = {
    model.addAttribute("locale", locale)
    "index"
  }
}
