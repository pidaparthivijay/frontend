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
    billStatus: string;
    customer: Customer;
    employee: Employee;
    name: string;
    requestId: number;
    room: Room;
    roomRequest: RoomRequest;
    roomRequestList: any;
    roomsList: any;
    tourPackage: TourPackage;
    tourPackageRequest: TourPackageRequest;
    user: User;
    userId: number;
}
