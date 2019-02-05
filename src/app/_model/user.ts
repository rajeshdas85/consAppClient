export class User {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName:string;
    email:string;
    isAdmin:boolean;
    
    //If 1:Admin 2:Project manager,3: SiteEngg
    empTypeId:number;
    photo:string;
    idProof:string;
    phoneNo:number;
}

