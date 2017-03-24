package daggerok.web;

import daggerok.data.UserRestRepository;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Locale;

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersPage {

    final UserRestRepository userRestRepository;

    @GetMapping
    public String index(final Model model) {
        val users = userRestRepository.findAll();
        model.addAttribute("users", users);
        return "users";
    }
}
