import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masonsry-view',
  templateUrl: './masonsry-view.component.html',
  styleUrls: ['./masonsry-view.component.css']
})
export class MasonsryViewComponent implements OnInit {
  showLayout = false;
  @Input() events;
  @Input() start;
  @Input() end;
  @Input() type;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.type);
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }
}
