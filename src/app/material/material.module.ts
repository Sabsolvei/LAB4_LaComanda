import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatStepperModule,
  MatListModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatListModule


  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatListModule
  ],
})
export class MaterialModule { }
