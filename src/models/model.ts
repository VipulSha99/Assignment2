export enum Role {
    SuperAdmin,
    Admin,
    Subscriber
  }

export interface UserAction{
  info:Array<object>,
  info1:Array<Array<string>>,
  addUser(refer:any):void,
  selectedRowEdit(refer:any):void,
  selectedRowDelete(i:any):void
}

