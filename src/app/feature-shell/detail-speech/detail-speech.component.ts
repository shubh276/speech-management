import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-detail-speech',
  templateUrl: './detail-speech.component.html',
  styleUrls: ['./detail-speech.component.scss']
})
export class DetailSpeechComponent implements OnInit {

  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

}
