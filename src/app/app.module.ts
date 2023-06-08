import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule, } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

//import {MatButtonModule} from '@angular/material/button';
import { YouTubePlayerModule } from '@angular/youtube-player';

//import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from 'src/service/apiservice.service';


import { TexteditorComponent } from './texteditor/texteditor.component';
import { AceModule } from 'ngx-ace-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { IgxSplitterModule } from "igniteui-angular";
import { IgxAccordionModule, IgxSwitchModule } from "igniteui-angular";
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FocustimerComponent } from './focustimer/focustimer.component';

import { TipComponent } from './tip/tip.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UniquePipe } from './unique.pipe';
import { FilterPipe } from './filter.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
//import { NgxTextDiffModule } from "ngx-text-diff";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgxTextDiffModule } from "ngx-text-diff";
import { AnswerBoxDialogComponent } from './answer-box-dialog/answer-box-dialog.component';



//I keep the new line

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    HeaderComponent,
    TexteditorComponent,
    FocustimerComponent,
    TipComponent,
    DialogboxComponent,

    UniquePipe,
    FilterPipe,
    AnswerBoxDialogComponent
  ],
  imports: [YouTubePlayerModule, HttpClientModule, FormsModule, ReactiveFormsModule, IgxSplitterModule, IgxAccordionModule, IgxSwitchModule, ScrollingModule, NgxTextDiffModule,
    BrowserModule, MatCardModule, MatButtonModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatProgressBarModule, OverlayPanelModule, MatProgressSpinnerModule,
    AppRoutingModule, MatMenuModule, MatGridListModule, AceModule, MatTabsModule, IconModule, MatTooltipModule, ButtonModule, SidebarModule, OverlayModule, MatExpansionModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, BrowserAnimationsModule, MatDividerModule, NgbModule],
  providers: [ApiserviceService, IconSetService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
