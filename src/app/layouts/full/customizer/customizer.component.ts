import { Component, OnInit, Renderer2, Inject, DoCheck } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { CustomizerService } from 'src/app/core/services/customizer.service';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: [],
})
export class CustomizerComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public customizer: CustomizerService
  ) {}

  ngOnInit() {}

  ngDoCheck(): void {
    const hostClass = this.customizer.dark ? 'darkTheme' : 'lightTheme';
    const hostClassdir = this.customizer.dir;
    this.renderer.setAttribute(
      this.document.body,
      'class',
      hostClass + ' ' + hostClassdir
    );
  }

  toggleDark() {
    const hostClass = !this.customizer.dark ? 'darkTheme' : 'lightTheme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

  setHorizontal() {
    return this.customizer.toggleHorizontal();
  }
  setTheme(cvalue: any) {
    this.customizer.setCurrentTheme(cvalue);
  }

  colorOptions: any = [
    {
      value: 'orangeTheme',
    },
    {
      value: 'blueTheme',
    },
    {
      value: 'purpleTheme',
    },
    {
      value: 'redTheme',
    },
    {
      value: 'indigoTheme',
    },
    {
      value: 'greenTheme',
    },
  ];
}
