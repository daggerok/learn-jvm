package daggerok.data

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
//@Canonical
class User {

  @Id
  @GeneratedValue
  Long id

  String name
}

