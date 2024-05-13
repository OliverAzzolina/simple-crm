import { Component, inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../models/customer.class';
import { Firestore, addDoc, collection } from 'firebase/firestore';
import { DatabaseService } from '../services/database.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [    CommonModule, MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, 
    FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatDatepickerModule, MatProgressBarModule, FormsModule, ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss'
})
export class DialogAddCustomerComponent {
  constructor(private database: DatabaseService, public dialogRef: MatDialogRef<DialogAddCustomerComponent>){};

  customer: Customer = new Customer();
  birthDate: Date;
  customerData: any;
  loading: boolean = false;

  firstNameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastNameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  birthdateFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.minLength(7)]);
  streetFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  numberFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  zipCodeFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  cityFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  async saveCustomer() {
    this.customer.birthDate = this.birthDate.getTime();
    const customerData = this.customer.toJSON();
    this.loading = true;
    await this.database.saveCustomer(customerData).then((result: any) => {
      console.log('added Customer', result);
      this.loading = false;
      this.dialogRef.close();
    });
  }

}