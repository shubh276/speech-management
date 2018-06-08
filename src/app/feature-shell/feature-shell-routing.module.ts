import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSpeechComponent } from './list-speech/list-speech.component';
import { DetailSpeechComponent } from './detail-speech/detail-speech.component';

const featureRoutes: Routes = [
    { path: 'speeches', component: ListSpeechComponent },
    { path: 'speeches/detail/:id', component: DetailSpeechComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(featureRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FeatureRoutingModule { }
