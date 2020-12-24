import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { AllAccountsComponent } from './components/all-accounts/all-accounts.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SendMoneyComponent } from './components/send-money/send-money.component';

const routes: Routes = [{
  path: 'allaccounts',
  component : AllAccountsComponent
},{
  path : 'statement',
  component: AccountStatementComponent  
},{
  path : 'sendmoney',
  component : SendMoneyComponent
},{
  path : 'createaccount',
  component : CreateAccountComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
