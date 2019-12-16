export class Room {

roomNumber : number;
floorNumber : number;
roomModel : string;
roomType : string;
roomCategory : string;
roomStatus : string;
checkInDate : Date;
checkOutDate : Date;

constructor(obj?: any) {
    this.roomNumber=obj ? obj.roomNumber : '';
    this.floorNumber = obj ? obj.floorNumber : '';
    this.roomModel = obj ? obj.roomModel : '';
    this.roomCategory = obj ? obj.roomCategory : '';
    this.checkInDate = obj ? obj.checkInDate: '';
    this.checkOutDate = obj ? obj.checkOutDate: '';
    this.roomStatus = obj ? obj.roomStatus : '';
    this.roomType = obj ? obj.roomType : '';    
}
}

