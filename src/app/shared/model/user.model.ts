export class User {
    userId: number;
    custName: string;
    userName: string;
    password: string;
    userType: string;
    userMob: string;
    userMail: string;

    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.custName = obj ? obj.custName : '';
        this.userMob = obj ? obj.userMob : '';
        this.userMail = obj ? obj.userMail : '';
        this.userName = obj ? obj.userName : '';
        this.password = obj ? obj.password : '';
        this.userType = obj ? obj.userType : '';
    }
}