export class Customer {
    custId: number;
    custName: string;
    custMob: string;
    custAge: number;
    custGen: string;
    custPass: string;
    custEmail: string;
    userName: string;
    custDob: Date;
    actionStatus: boolean;
    statusMessage: string;
    constructor(obj?: any) {
        this.custId = obj ? obj.custId : '';
        this.custName = obj ? obj.custName : '';
        this.userName = obj ? obj.userName : '';
        this.custDob = obj ? obj.custDob : '';
        this.custAge = obj ? obj.custAge : '';
        this.custMob = obj ? obj.custMob : '';
        this.custGen = obj ? obj.custGen : '';
        this.custPass = obj ? obj.custPass : '';
        this.custEmail = obj ? obj.custEmail : '';
        this.actionStatus = obj ? obj.actionStatus : '';
        this.statusMessage = obj ? obj.statusMessage : '';
    }
}