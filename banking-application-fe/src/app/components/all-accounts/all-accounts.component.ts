import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectUnsubscribedError } from 'rxjs';
import { Account, AccountType } from 'src/app/models/Account';
import {AccountsControllerService} from '../../services/accounts-controller.service'


@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Acc No.', 'Curr Bal', 'Acc Type','Curr Lmt'];
  dataSource = new MatTableDataSource<Account>();
  loadAccount = new Array<Account>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountsControllerService : AccountsControllerService) { }
  ngOnInit(): void {    
    this.getAllAccount();
  }

  getAllAccount(){
    this.accountsControllerService.getAllAccount().subscribe(
      data => {                 
        for (var d of Object.values(data)){
          let newTodo = Object.assign(new Account(), d);
          this.loadAccount.push(newTodo);
        }
        this.dataSource = new MatTableDataSource(this.loadAccount);
        this.dataSource.paginator = this.paginator
      },
        err => console.error(err),
      () => console.log(this.dataSource)      
    );
  }


}

 
