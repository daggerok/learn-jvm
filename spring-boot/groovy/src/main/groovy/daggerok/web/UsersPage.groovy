package daggerok.web

import daggerok.data.UserRestRepository
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/users")
class UsersPage {

  final UserRestRepository userRestRepository

  UsersPage(final UserRestRepository userRestRepository) {
    this.userRestRepository = userRestRepository
  }

  @GetMapping
  def index(final Model model) {
    def users = userRestRepository.findAll()
    model.addAttribute("users", users)
    "users"
  }
}
