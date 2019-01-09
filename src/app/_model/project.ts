export class Project {
    id: string;
    projName: string;
    projDesc: string;
    projManagerId: string;
    projval:number;
    commenceDate:Date;
    completionDate:Date;
    client:string;
    location:string;
    pillingInfoByProjectID1: PillingInfoByProjectID1[];
    pillingInfoByProjectID2: PillingInfoByProjectID2[];
    otherInfoByProjectID: OtherInfoByProjectID[];
    updateDate: string;
  //  DateTest: Date;

}
export class PillingInfoByProjectID1 {
    id:string;
    desc: string;
    qty: number;
    rate: number;
    amount: number;
    physicalStatus: number;
    financialStatus: number;
}
export class PillingInfoByProjectID2 {
    id:string;
    desc: string;
    qty: number;
    rate: number;
    amount: number;
    physicalStatus: number;
    financialStatus: number;
}
export class OtherInfoByProjectID {
    id:string;
    desc: string;
    qty: number;
    rate: number;
    amount: number;
    physicalStatus: number;
    financialStatus: number;
}
export class ProjectRecording {
    projId: string;
    pileNo: string; //projId - pileNo
    startDate: Date;
    fromTimeOfBoring: string;
    toTimeOfBoring: string;
    depthOfBoreFrom: number;
    depthOfBoreTo: number;
    finalDepthOfBore: number;
    descriptionOfSoil: string;
    RLOfThePileFrom: number;
    RLOfThePileTo: number;
    siteEnggId: string;
    remarks: string;
}

export class ProjectBOM{
    srNo:number;
    projId: string;
    desc:  string;
    rate: number;
    qty: number;
    amount: number;
    status: number;
    createDate:  string;
    updateDate:  string;
}
export class PileEntry {
    projId: string;
    pileNo: string; //projId - pileNo
    description: string;
    nameOfCompany: string;
    pilingRigDetails: string;
    casingToplevel: number;
    existingToplevel: number;
    pillingCutOfflevel: number;
    cageLengthRequired: number;
    cageloweringStartTime: string;
    cageloweringEndTime: string;
    noOfTrimePiecesRequired: number;
    noOfTrimePiecesUsed: number;
    nameOfSiteEngg: string;
    siteEnggId: string;
    concretePouring: Date;
}

export class ProjectHistory {
    uniqueId:string;
    projId: string;
    pileNo: string;
    dateOfStarting: Date;
    dateOfEnding: Date;
    pillingRigDetails: string;
    diaOfPile: number;
    casingToplevel: number;
    existingToplevel: number;
    pillingCutOfflevel: number;
    foundinglevel: number;
    emptyBoreDepth: number;
    beforeDepthFromCTL: number;
    beforeDepthFromEGL: number;
    beforeDepthFromCOL: number;
    concreteQtyTheorotical: number;
    concreteQtyActual: number;
    cageLengthRequired: number;
    boringStartTime: string;
    boringEndTime: string;
    totalBoringTime: string;
    cageLoweringStartTime: string;
    cageLoweringEndTime: string;
    totalTimeForCageLowering: string;
    noOfTrimePiecesRequired: number;
    noOfTrimePiecesUsed: number;
    nameOfSiteEngg: string;
    siteEnggId: string;
}
export enum MessageType {
    Success = 0,
    Error = 1,
    Warn = 2,
    Info = 3,
}