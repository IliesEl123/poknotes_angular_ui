import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-hnavbar',
  templateUrl: './hnavbar.component.html',
  styleUrls: [],
})
export class Hnavbar implements OnInit {
  @Input() depth: any;
  @Input() item: any;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {}
  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
  }
}
