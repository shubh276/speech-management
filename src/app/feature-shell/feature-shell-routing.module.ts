import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSpeechComponent } from './list-speech/list-speech.component';
import { DetailSpeechComponent } from './detail-speech/detail-speech.component';
import { FeatureShellComponent } from './feature-shell.component';

const featureRoutes: Routes = [
    {
        path: 'speeches',
        component: FeatureShellComponent,
        children: [
            { path: '', component: ListSpeechComponent },
            { path: 'detail/:id', component: DetailSpeechComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(featureRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FeatureRoutingModule { }
