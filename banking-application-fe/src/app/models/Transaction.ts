import { Timestamp } from "rxjs";

export class Transaction {  
  
    transactionId:String;  
    accountNumber:String;  
    transactionAmount : String;    
    transactionDateTime : Timestamp<Date>;
    type : String;
}  