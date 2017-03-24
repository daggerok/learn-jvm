package daggerok

import daggerok.config.AppConfig
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Import

@Import(Array(
  classOf[AppConfig]
))
@SpringBootApplication
class ScalaWebApplicationConfig

object WebApplication extends App {
  SpringApplication.run(classOf[ScalaWebApplicationConfig])
}
