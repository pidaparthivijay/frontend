export class RewardPoints {
    id: number;
    userId: number;
    custId: number;
    pointsEarned: number;
    pointsEarnedDate: Date;
    pointsExpiryDate: Date;
    pointsStatus: string;
    pointsTransactionName: string;
    constructor(obj?: any) {
        this.pointsTransactionName = obj ? obj.pointsTransactionName : '';
        this.pointsStatus = obj ? obj.pointsStatus : '';
        this.pointsEarned = obj ? obj.pointsEarned : '';
        this.pointsExpiryDate = obj ? obj.pointsExpiryDate : '';
        this.pointsEarnedDate = obj ? obj.pointsEarnedDate : '';
        this.custId = obj ? obj.custId : '';
        this.userId = obj ? obj.userId : '';
        this.id = obj ? obj.id : '';
    }
}
