package daggerok.web

import daggerok.data.UserRestRepository
//import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.{GetMapping, RequestMapping}

@Controller
@RequestMapping(Array("/users"))
// // we don't need @autowire on constructor since spring-boot 1.4+
//class UsersPage @Autowired()(private val userRestRepository: UserRestRepository) {
class UsersPage (private val userRestRepository: UserRestRepository) {

  @GetMapping
  def index(model: Model) = {
    val users = userRestRepository.findAll()
    model.addAttribute("users", users)
    "users"
  }
}
