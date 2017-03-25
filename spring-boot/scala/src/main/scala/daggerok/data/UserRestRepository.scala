package daggerok.data

import java.lang.Long

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource
trait UserRestRepository extends JpaRepository[User, Long]
