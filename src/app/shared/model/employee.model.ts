export class Employee {
    userId: number;
    empId: number;
    empName: string;
    userName: string;
    empGen: string;
    empPass: string;
    actionStatus: string;
    statusMessage: string;
    email: string;

    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.empName = obj ? obj.empName : '';
        this.statusMessage = obj ? obj.statusMessage : '';
        this.email = obj ? obj.email : '';
        this.userName = obj ? obj.userName : '';
        this.empGen = obj ? obj.empGen : '';
        this.empPass = obj ? obj.empPass : '';
        this.actionStatus = obj ? obj.actionStatus : '';
    }
}