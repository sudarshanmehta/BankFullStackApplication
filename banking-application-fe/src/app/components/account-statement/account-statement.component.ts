
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Statement } from 'src/app/models/Statement';
import { Transaction } from 'src/app/models/Transaction';
import { AccountsControllerService } from 'src/app/services/accounts-controller.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  displayedColumns: string[] = ['Transaction Id','Acc. No.','Transaction Amount','Tx. Date','Type'];  
  accountStatementForm : FormGroup
  statement : Statement   
  dataSource = new MatTableDataSource<any>();  
  balance: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private accountsControllerService : AccountsControllerService, private _formBuilder: FormBuilder) { }

  ngOnInit(){   
    this.accountStatementForm = this._formBuilder.group({
      'accountNumber':[null, Validators.required],      
    }); 
  } 

  OnGetStatement(accountStatementForm : NgForm){
    this.statement = new Statement();
    this.statement.accountNumber = accountStatementForm['accountNumber'];    

    this.accountsControllerService.getStatement(this.statement).subscribe(
      data => {  
        this.balance = data['currentBalance']            
        this.dataSource = new MatTableDataSource(data['transactionHistory'] )
        this.dataSource.paginator = this.paginator
      },
      err => console.error(err),
      () => console.log()            
    );
    this.accountStatementForm.reset();  
  } 
}
