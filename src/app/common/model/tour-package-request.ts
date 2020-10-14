export class TourPackageRequest {
    actionStatus: boolean;
    /**
        * GEND => GENERATED
        * PAID => PAID
        * PEND => PENDING
        */
    billStatus: string;
    guestCount: number;
    requestDate: Date;
    startDate: Date;
    tourPackageName: string;
    tourPackageRequestId: number;
    userId: number;
    userName: string;
    vehicleName: string;
}