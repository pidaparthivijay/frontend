import { Room } from './room.model';

export class RoomRequest {
    requestId:number;
    userId: number;
    custName: string;
    guestName: string;
    checkInDate: Date;
    checkOutDate: Date;
    guestGen: string;
    guestCount: number;
    modelOfRooms: string;
    typeOfRooms: string;
    roomCount: number;
    //roomsList: Array<any>;
    roomRequestStatus: string;

    constructor(obj?: any) {
        this.requestId=obj ? obj.requestId : '';
        this.userId = obj ? obj.userId : '';
        this.custName = obj ? obj.custName : '';
        this.guestName = obj ? obj.guestName : '';
        this.checkInDate = obj ? obj.checkInDate: '';
        this.checkOutDate = obj ? obj.checkOutDate: '';
        this.guestGen = obj ? obj.guestGen : '';
        this.roomCount = obj ? obj.roomCount : '';
        this.typeOfRooms = obj ? obj.typeOfRooms : '';
        this.modelOfRooms= obj ? obj.modelOfRooms : '';
        this.roomCount=obj ? obj.roomCount : '';
//        this.roomsList = obj ? obj.roomsList : '';
        this.roomRequestStatus = obj ? obj.roomRequestStatus : '';

    }
}
