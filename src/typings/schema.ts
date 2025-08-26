export interface TokenInfoSchema {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

// APIs

export interface GetEstimateDetailSchema {
  batchInfo: {
    id: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    type: string;
    title: string;
    startDate: string;
    endDate: string;
    recipient: string;
    autoSumAmount: number;
    adultsCount: number;
    childrenCount: number;
    infantsCount: number;
    onlyPlace: boolean;
    hidePrice: boolean;
    userId: null;
    quotation: string;
    preparedBy: string;
    address: string;
    email: string;
    officeHours: string;
    officeNumber: string;
    emergencyNumber: string;
  };
  estimateInfo: {
    id: number;
    createdAt: string;
    updatedAt: string;
    receiveAt: string;
    comment: string;
    sender: null;
    summary: string;
    autoSumAmount: string;
    timeline: string;
    batchId: number;
  };

  estimateDetails: {
    id: number;
    createdAt: string;
    updatedAt: string;
    price: number;
    days: number;
    sequence: number;
    quantity: number;
    estimateId: number;
    itemId: number;
    enableContent: boolean;
    item: {
      id: number;
      createdAt: string;
      updatedAt: string;
      type: string;
      nameKor: string;
      nameEng: string;
      price: number;
      address: string;
      addressEnglish: string;
      description: string;
      keyword: string;
      lat: string;
      lng: string;
      enable: boolean;
      pricePolicy: string;
      websiteLink: string;
      files: {
        id: number;
        createdAt: string;
        updatedAt: string;
        type: string;
        itemSrc: string;
        itemSize: string;
      }[];
    };
  }[];
}
