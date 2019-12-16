export class OneTimePassword {
    otpId: number;
    otpValue: string;
    createdDate: Date;
    userName: string;
    valid: boolean;
    constructor(obj?: any) {
        this.otpId = obj ? obj.otpId : '';
        this.otpValue = obj ? obj.otpValue : '';
        this.userName = obj ? obj.userName : '';
        this.createdDate = obj ? obj.createdDate : '';
        this.valid = obj ? obj.valid : '';
    }
}
