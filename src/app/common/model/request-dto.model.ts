import { Amenity } from './amenity.model';
import { Customer } from './customer.model';
import { Employee } from './employee.model';
import { RoomRequest } from './room-request';
import { Room } from './room.model';
import { TourPackageRequest } from './tour-package-request';
import { TourPackage } from './tour-package.model';
import { User } from './user.model';

export class RequestDTO {
    actionStatus: string;
    amenity: Amenity;
    amenityList: any;
    amenityRequest: any;
    amenityRequestList: any;
    billStatus: string;
    countOfRooms: number;
    customer: Customer;
    employee: Employee;
    employeesList: any;
    floorNumber: number;
    lookup: any;
    lookupDefinitionName: string;
    lookupDefsList: any;
    lookupExcel: any;
    lookupList: any;
    name: string;
    formData: any;
    pdfStream: any;
    pendingBillRequests: any;
    requestId: number;
    rewardPointsList: any;
    room: Room;
    roomRequest: RoomRequest;
    roomRequestId: number;
    roomRequestList: any;
    roomsList: any;
    roomStatus: string;
    statusMessage: string;
    tourPackage: TourPackage;
    tourPackageList: any;
    tourPackageRequest: TourPackageRequest;
    tourPackageRequestList: any;
    user: User;
    userId: number;
}
