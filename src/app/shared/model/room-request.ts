import { Room } from './room.model';

export class RoomRequest {
    requestId: number;
    userId: number;
    custName: string;
    guestName: string;
    checkInDate: Date;
    checkOutDate: Date;
    guestGen: string;
    guestCount: number;
    roomModel: string;
    roomType: string;
    roomCategory: string;
    //roomsList: Array<any>;
    roomRequestStatus: string;

    constructor(obj?: any) {
        this.requestId = obj ? obj.requestId : '';
        this.userId = obj ? obj.userId : '';
        this.custName = obj ? obj.custName : '';
        this.guestName = obj ? obj.guestName : '';
        this.checkInDate = obj ? obj.checkInDate : '';
        this.checkOutDate = obj ? obj.checkOutDate : '';
        this.guestGen = obj ? obj.guestGen : '';
        this.roomCategory = obj ? obj.roomCategory : '';
        this.roomType = obj ? obj.roomType : '';
        this.roomModel = obj ? obj.roomModel : '';
        //        this.roomsList = obj ? obj.roomsList : '';
        this.roomRequestStatus = obj ? obj.roomRequestStatus : '';

    }
}
