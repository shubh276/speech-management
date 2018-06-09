import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Speech } from './feature-shell.config';
import { SPEECHES } from '../shared/mock-data';

@Injectable()
export class FeatureShellService {
    speeches = SPEECHES;

    findIndex(id) {
        const totalRows = this.speeches.length;
        let index = -1;
        for (let i = 0; i < totalRows; i++) {
            if (this.speeches[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    getSpeeches() {
        return of(this.speeches);
    }
    editSpeech(speech) {
        const index = this.findIndex(parseInt(speech.id));
        this.speeches[index].id = parseInt(speech.id);
        this.speeches[index].author = speech.author;
        this.speeches[index].title = speech.title;
        this.speeches[index].date = speech.date;
        this.speeches[index].content = speech.content;
        return of("Speech updated successfully.");
    }
    deleteSpeech(id) {
        const index = this.findIndex(id);
        if (index !== -1) {
            this.speeches.splice(index, 1);
        }
        return of("Speech deleted successfully.");
    }
    addSpeech(speech) {
        speech.id = 10 + this.speeches.length;
        this.speeches.push(speech);
        return of("Speech added successfully.");
    }
    getSpeechDetails(id) {
        const index = this.findIndex(id);
        return of(this.speeches[index]);
    }
}