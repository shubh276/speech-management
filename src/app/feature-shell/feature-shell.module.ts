import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSpeechComponent } from './list-speech/list-speech.component';
import { DetailSpeechComponent } from './detail-speech/detail-speech.component';
import { FeatureRoutingModule } from './feature-shell-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEditSpeechComponent } from './add-edit-speech/add-edit-speech.component';
import { FeatureShellComponent } from './feature-shell.component';
import { FeatureShellService } from './feature-shell.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FeatureRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        ListSpeechComponent,
        DetailSpeechComponent,
        AddEditSpeechComponent,
        FeatureShellComponent
    ],
    providers: [FeatureShellService]
})
export class FeatureShellModule { }
