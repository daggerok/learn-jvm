package daggerok

import daggerok.config.AppConfig
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Import

@Import([
    AppConfig.class
])
@SpringBootApplication
class GroovyWebApplication {

  static void main(String[] args) {
    SpringApplication.run GroovyWebApplication, args
  }
}
