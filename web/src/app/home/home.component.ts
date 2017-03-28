import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
//
import { HighlightJsService } from 'angular2-highlight-js';

const groovyFileContent: string = require('../../../../spring-boot/groovy/src/main/groovy/daggerok/GroovyWebApplication.groovy');
const javaFileContent: string = require('../../../../spring-boot/java/src/main/java/daggerok/JavaWebApplication.java');
const kotlinFileContent: string = require('../../../../spring-boot/kotlin/src/main/kotlin/daggerok/KotlinWebApplication.kt');
const scalaFileContent: string = require('../../../../spring-boot/scala/src/main/scala/daggerok/ScalaWebApplication.scala');

class JvmSourceFile {
  constructor(
    public lang: string,
    public content: string,
  ) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  public jvmSourceFiles: JvmSourceFile[];
  constructor(
    private el: ElementRef,
    private service: HighlightJsService,
  ) {}
  public ngOnInit() {
    this.jvmSourceFiles = [
      { lang: 'groovy', content: groovyFileContent },
      { lang: 'java', content: javaFileContent },
      { lang: 'kotlin', content: kotlinFileContent },
      { lang: 'scala', content: scalaFileContent },
    ].map((raw: any, inde: number) =>
      new JvmSourceFile(raw.lang, raw.content)
    );
  }
  public ngAfterViewInit(): void {
    // this.service.highlight(this.el.nativeElement.querySelector('.typescript'));
    this.service.highlight(this.el.nativeElement.querySelector('.groovy'));
    this.service.highlight(this.el.nativeElement.querySelector('.java'));
    this.service.highlight(this.el.nativeElement.querySelector('.kotlin'));
    this.service.highlight(this.el.nativeElement.querySelector('.scala'));
  }
}
