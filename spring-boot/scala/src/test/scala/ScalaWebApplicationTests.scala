import daggerok.ScalaWebApplicationConfig
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.test.context.junit4.SpringRunner
//import org.springframework.test.context.ContextConfiguration
//@ContextConfiguration(classes = Array(classOf[ScalaWebApplicationConfig]))
@RunWith(classOf[SpringRunner])
@SpringBootTest(
  webEnvironment = WebEnvironment.RANDOM_PORT,
  classes = Array(classOf[ScalaWebApplicationConfig]))
class ScalaWebApplicationTests {

  @Test
  def testContext() = {}
}
