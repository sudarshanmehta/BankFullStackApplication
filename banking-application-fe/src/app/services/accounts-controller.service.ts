import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable,of, from } from 'rxjs';
import {Account} from './../models/Account'
import { TransferBalance } from '../models/TransferBalance';
import { Statement } from '../models/Statement';
const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AccountsControllerService {  
  constructor(private http:HttpClient) {}  

  API_URL = 'http://bankingappbe-dev.eba-mit897gc.ap-south-1.elasticbeanstalk.com'

  getAllAccount(){
    return this.http.get(this.API_URL+'/api/account/all',{headers:httpOptions.headers});
  }

  createAccount(account : Account){
    return this.http.post(this.API_URL+'/api/account/create',account,{headers:httpOptions.headers});
  }

  transferBalance(tr : TransferBalance){    
    return this.http.post(this.API_URL+'/api/account/sendmoney',tr,{headers:httpOptions.headers});
  }

  getStatement(tr : Statement){    
    return this.http.post(this.API_URL+'/api/account/statement',tr,{headers:httpOptions.headers});
  }
}
