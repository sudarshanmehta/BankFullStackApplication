import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/models/Transaction';
import { TransferBalance } from 'src/app/models/TransferBalance';
import { AccountsControllerService } from 'src/app/services/accounts-controller.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  dataSource = new MatTableDataSource<Transaction>();
  transactions = new Array<Transaction>();
  transferBalance : TransferBalance;
  transferBalanceForm : FormGroup
  displayedColumns: string[] = ['Transaction Id','Acc. No.','Transaction Amount','Tx. Date','Type'];  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountsControllerService : AccountsControllerService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  this.transferBalanceForm = this._formBuilder.group({
    'fromAccount':[null, Validators.required],
    'toAccount': [null, Validators.required],      
    'Balance': [null, Validators.required],       
  });
  }

  OnTransferBalance(transferBalanceForm : NgForm){
    this.transferBalance = new TransferBalance();
    this.transferBalance.fromAccountNumber = transferBalanceForm['fromAccount'];
    this.transferBalance.toAccountNumber = transferBalanceForm['toAccount'];
    this.transferBalance.amount = transferBalanceForm['Balance'];

    this.accountsControllerService.transferBalance(this.transferBalance).subscribe(
      data => {
        for (var d of Object.values(data)){
          let newTodo = Object.assign(new Transaction(), d);
          this.transactions.push(newTodo);
        }
        this.dataSource = new MatTableDataSource(this.transactions)
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err),
      () => console.log('transfer success')            
    );
    this.transferBalanceForm.reset();
  }


}
