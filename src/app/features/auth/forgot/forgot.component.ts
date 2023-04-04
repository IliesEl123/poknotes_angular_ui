import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizerService } from 'src/app/core/services/customizer.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  constructor(private router: Router, public customizer: CustomizerService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.router.navigate(['/authentication/login']);
  }
}
