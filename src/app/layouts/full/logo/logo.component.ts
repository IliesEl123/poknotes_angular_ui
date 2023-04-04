import { Component, OnInit } from '@angular/core';
import { CustomizerService } from 'src/app/core/services/customizer.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor(public customizer: CustomizerService) {}

  ngOnInit(): void {}
}
