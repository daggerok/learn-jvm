package daggerok.domain

import java.lang.Long
import javax.persistence.{Entity, GeneratedValue, Id}

import org.hibernate.validator.constraints.NotEmpty

import scala.beans.BeanProperty

@Entity
class User {

  @Id
  @BeanProperty
  @GeneratedValue
  var id: Long = _

  @NotEmpty
  @BeanProperty
  var name: String = _
}
