import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
//
import { HighlightJsService } from 'angular2-highlight-js';
//
const groovy = require('../../../../spring-boot/groovy/src/main/groovy/daggerok/GroovyWebApplication.groovy');
const java = require('../../../../spring-boot/java/src/main/java/daggerok/JavaWebApplication.java');
const kotlin = require('../../../../spring-boot/kotlin/src/main/kotlin/daggerok/KotlinWebApplication.kt');
const scala = require('../../../../spring-boot/scala/src/main/scala/daggerok/ScalaWebApplication.scala');

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
      { lang: 'groovy', content: groovy },
      { lang: 'java', content: java },
      { lang: 'kotlin', content: kotlin },
      { lang: 'scala', content: scala },
    ].map((raw: any, inde: number) =>
      new JvmSourceFile(raw.lang, raw.content)
    );
  }

  public ngAfterViewInit(): void {
    this.highlight('.groovy');
    this.highlight('.java');
    this.highlight('.kotlin');
    this.highlight('.scala');
  }

  private highlight(selector: string): void {
    this.service.highlight(
      this.el.nativeElement.querySelector(selector)
    );
  }
}
