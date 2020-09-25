import { environment } from 'src/environments/environment';

export class RequestMappings {

    public static readonly AMENITY_CREATE = environment.baseURL + '/createAmenity';
    public static readonly AMENITY_DELETE_TOGGLE = environment.baseURL + '/toggleDeleteAmenity';
    public static readonly AMENITY_UPDATE = environment.baseURL + '/updateAmenity';
    public static readonly AMENITY_REQUEST = environment.baseURL + '/requestAmenity';
    public static readonly AMENITY_VIEW_ALL = environment.baseURL + '/viewAllAmenities';
    public static readonly CUSTOMER_CANCEL_ROOM = environment.baseURL + '/cancelRequest';
    public static readonly CUSTOMER_DETAILS = environment.baseURL + '/getCustomerDetails';
    public static readonly CUSTOMER_GET_ALL_REQUESTS = environment.baseURL + '/getMyRequestsList';
    public static readonly CUSTOMER_REGISTER = environment.baseURL + '/registerCustomer';
    public static readonly CUSTOMER_VIEW_RWD_POINTS = environment.baseURL + '/viewRewardPoints';
    public static readonly EMP_CREATE = environment.baseURL + '/createEmployee';
    public static readonly LOGIN = environment.baseURL + '/login';
    public static readonly LOOKUP_CREATE = environment.baseURL + '/createLookup';
    public static readonly LOOKUP_DELETE_TOGGLE = environment.baseURL + '/toggleDelete';
    public static readonly LOOKUP_EXCEL_UPLOAD = environment.baseURL + '/uploadLookupExcel';
    public static readonly LOOKUP_UPDATE = environment.baseURL + '/updateLookup';
    public static readonly LOOKUP_VIEW_ALL = environment.baseURL + '/viewLookupList';
    public static readonly LOOKUP_VIEW_BY_DEF = environment.baseURL + '/getLookupListByDefinition';
    public static readonly LOOKUP_VIEW_DEF = environment.baseURL + '/getLookupDefs';
    public static readonly OTP_REQUEST = environment.baseURL + '/requestOTP';
    public static readonly OTP_SUBMIT = environment.baseURL + '/submitOtp';
    public static readonly PENDING_BILL_VIEW = environment.baseURL + '/getPendingBillRequests';
    public static readonly RESET_PWD = environment.baseURL + '/resetPwd';
    public static readonly ROOM_CREATE = environment.baseURL + '/createRoom';
    public static readonly ROOM_CREATE_MULTIPLE = environment.baseURL + '/createRoomMultiple';
    public static readonly ROOM_REQUEST_ASSIGN_ROOM = environment.baseURL + '/assignRoomToRequest';
    public static readonly ROOM_REQUEST_CREATE = environment.baseURL + '/requestRoom';
    public static readonly ROOM_REQUEST_FEASIBLE = environment.baseURL + '/viewFeasibleRooms';
    public static readonly ROOM_REQUEST_VIEW_ALL = environment.baseURL + '/getAllRoomRequests';
    public static readonly ROOM_VIEW_ALL = environment.baseURL + '/getAllRooms';
    public static readonly ROOM_VIEW_BY_FLOOR = environment.baseURL + '/getRoomsByFloor';
    public static readonly ROOM_VIEW_BY_STATUS = environment.baseURL + '/getRoomsByStatus';
    public static readonly TOUR_PKG_BOOK = environment.baseURL + '/bookTourPackage';
    public static readonly TOUR_PKG_CREATE = environment.baseURL + '/createTourPackage';
    public static readonly TOUR_PKG_DELETE_TOGGLE = environment.baseURL + '/toggleDeleteTourPackage';
    public static readonly TOUR_PKG_UPDATE = environment.baseURL + '/updateTourPackage';
    public static readonly TOUR_PKG_VIEW_ALL = environment.baseURL + '/viewAllTourPackages';
}
