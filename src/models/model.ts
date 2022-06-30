export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber"
  }

export interface UserAction{
  info:Array<object>,
  info1:Array<Array<string>>,
  addUser(refer:any):void,
  selectedRowEdit(refer:any):void,
  selectedRowDelete(i:any):void
}

