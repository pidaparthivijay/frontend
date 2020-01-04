export class TourPackageRequest {

    tourPackageRequestId: number;
    tourPackageName: string;
    guestCount: number;
    requestDate: Date;
    startDate: Date;
    userId: number;

    vehicleName: string;
	/**
	 * PEND => PENDING
	 * GEND => GENERATED
	 * PAID => PAID
	 */
    billStatus: string;
    actionStatus: boolean;
}
