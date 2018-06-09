import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Speech } from '../feature-shell.config';
import { FeatureShellService } from '../feature-shell.service';
import { AddEditSpeechComponent } from '../add-edit-speech/add-edit-speech.component';
declare var $;
@Component({
  selector: 'app-detail-speech',
  templateUrl: './detail-speech.component.html',
  styleUrls: ['./detail-speech.component.scss']
})
export class DetailSpeechComponent implements OnInit {

  id: number;
  selectedSpeech: Speech;
  tooltipBefore = 'before';
  tooltipAfter = 'after';
  @ViewChild(AddEditSpeechComponent) addEditModal: AddEditSpeechComponent;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public featureService: FeatureShellService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getSpeechDetails();
    });
  }

  openActionModal(event) {
    $('#addEditModal').modal('show');
    this.addEditModal.setEditFormValues();
  }

  closeActionModal(message) {
    $('#addEditModal').modal('hide');
    if (message !== 'true') {

      this.getSpeechDetails();
      setTimeout(function () {
        alert(message);
      }, 100);
    }
    // this.addEditModal.createAddEditForm();
  }

  deleteWarningModal(event) {
    $('#deleteModal').modal('show');
  }

  deleteSpeech() {
    let message = '';
    this.featureService.deleteSpeech(this.selectedSpeech.id).subscribe(result => {
      message = result;
      this.router.navigate(["/speeches"]);
      $('#deleteModal').modal('hide');
    });
    
  }

  cancelDelete() {
    $('#deleteModal').modal('hide');
  }

  getSpeechDetails() {
    this.featureService.getSpeechDetails(this.id).subscribe( result => {
      this.selectedSpeech = result;
    });
  }
}
