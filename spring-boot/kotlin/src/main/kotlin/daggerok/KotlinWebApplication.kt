package daggerok

import daggerok.config.AppConfig
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Import

@SpringBootApplication
@Import(AppConfig::class)
class KotlinApplication

fun main(args: Array<String>) {
  SpringApplication.run(KotlinApplication::class.java, *args)
}
