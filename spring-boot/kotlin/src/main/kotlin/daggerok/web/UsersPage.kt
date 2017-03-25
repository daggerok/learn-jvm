package daggerok.web

import daggerok.data.UserRestRepository
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/users")
class UsersPage(val userRestRepository: UserRestRepository) {

  @GetMapping
  fun index(model: Model): String {
    val users = userRestRepository.findAll()
    model.addAttribute("users", users)
    return "users"
  }
}
