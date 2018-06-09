import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Speech } from '../feature-shell.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureShellService } from '../feature-shell.service';

@Component({
  selector: 'app-add-edit-speech',
  templateUrl: './add-edit-speech.component.html',
  styleUrls: ['./add-edit-speech.component.scss']
})
export class AddEditSpeechComponent implements OnInit {
  addEditForm: FormGroup;
  @Input('selectedSpeech') selectedSpeech: Speech;
  @Output() closeForm = new EventEmitter<string>();

  constructor(private fb: FormBuilder, public featureService: FeatureShellService) {
    this.createAddEditForm();
    if (this.selectedSpeech) {
      this.setEditFormValues();
    }
  }

  ngOnInit() {

  }

  createAddEditForm() {
    this.addEditForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      date: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnChanges() {
    if (this.selectedSpeech) {
      this.setEditFormValues();
    }
  }

  setEditFormValues() {
    this.addEditForm.setValue({
      title: this.selectedSpeech.title,
      author: this.selectedSpeech.author,
      date: this.selectedSpeech.date,
      content: this.selectedSpeech.content
    });
  }

  onSubmit(formData) {
    if (this.addEditForm.valid) {
      let newSpeech = {};
      if (this.selectedSpeech) {
        newSpeech['id'] = this.selectedSpeech.id;
      } else {
        newSpeech['id'] = 0;
      }
      newSpeech['author'] = formData.author;
      newSpeech['title'] = formData.title;
      newSpeech['content'] = formData.content;
      newSpeech['date'] = formData.date;
      let message = '';
      if (this.selectedSpeech) {
        this.featureService.editSpeech(newSpeech).subscribe(result => {
          message = result;
        });
      } else {
        this.featureService.addSpeech(newSpeech).subscribe(result => {
          message = result;
        });
      }
      this.closeForm.emit(message);
    }
  }

  onCancel() {
    this.createAddEditForm();
    this.closeForm.emit('true');
  }



}
