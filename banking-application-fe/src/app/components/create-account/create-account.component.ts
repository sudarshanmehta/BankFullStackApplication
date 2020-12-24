import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';
import { AccountsControllerService } from 'src/app/services/accounts-controller.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  dataSource = new MatTableDataSource<Account>();
  account : Account; 
  accountForm : FormGroup
  displayedColumns: string[] = ['Id', 'Acc No.', 'Curr Bal', 'Acc Type','Curr Lmt'];
  accounts = new Array<Account>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private accountsControllerService : AccountsControllerService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this._formBuilder.group({
      'accoutNumber':[null, Validators.required],
      'accountBalance': [null, Validators.required],      
      'currentLimit': [null, Validators.required],
      'accountType': [null, Validators.required],   
  });
  }

  onSubmit(form: NgForm) {
    this.account = new Account();
    this.account.accountNumber = form['accoutNumber'];
    this.account.accountType = form['accountType'];
    this.account.currentBalance = form['accountBalance'];
    this.account.currentLimit = form['currentLimit'];    
    this.accountsControllerService.createAccount(this.account).subscribe(
      data => {
        for (var d of Object.values(data)){
          let newTodo = Object.assign(new Account(), d);
          this.accounts.push(newTodo);
        }
        this.dataSource = new MatTableDataSource(this.accounts),
        this.dataSource.paginator = this.paginator
      },
      err => console.error(err),
      () => console.log('account saved')            
    );
    this.accountForm.reset();        
  }
}
