import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ListSpeechComponent } from './list-speech/list-speech.component';
import { DetailSpeechComponent } from './detail-speech/detail-speech.component';
import { FeatureRoutingModule } from './feature-shell-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { AddEditSpeechComponent } from './add-edit-speech/add-edit-speech.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FeatureRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatIconModule
    ],
    declarations: [
        ListSpeechComponent,
        DetailSpeechComponent,
        AddEditSpeechComponent
    ],
    providers: []
})
export class FeatureShellModule { }
