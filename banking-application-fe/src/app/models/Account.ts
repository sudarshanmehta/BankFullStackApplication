export class Account {  
 
    constructor(){}
    accountId:number;  
    accountNumber:String;  
    currentBalance : number;
    accountType:AccountType;  
    currentLimit:number;  
}  

export enum AccountType {
    current,savings
}