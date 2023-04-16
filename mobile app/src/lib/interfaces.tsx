export interface User {
  id: number;
  email: string;
  name: any;
  userType: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  addedBy: any;
  updatedBy: any;
  phone_number: any;
  profile_img: any;
  sign_img: any;
  address_line_1: any;
  address_line_2: any;
  crater_name: any;
  colony_name: any;
  pincode: any;
  age: any;
  profession: any;
  experience: any;
  dob: any;
  hobbies: any;
  SDGs: any;
  investment_frequency: any;
  company_domains: any;
  impact_domains: any;
  notif_token: any;
  isAuth: boolean | null;
  blob: any;
  mobileNo: any;
  token: string;
}

export interface UserSignUp {
  SDGs: string;
  adLink: string;
  addrLine1: string;
  addrline2: string;
  city: string;
  demLink: string;
  dob: string;
  email: string;
  experience: string;
  fname: string;
  hobbies: string;
  imgLink: string;
  income: string;
  lname: string;
  middle: string;
  otp: string;
  phone: string;
  pinCode: string;
  profession: string;
  singLink: string;
  state: string;
}

export interface StockData {
  id: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  addedBy: number;
  updatedBy: any;
  name: string;
  sub_heading: string;
  description: string;
  company_img: string;
  comapny_name: string;
  investment_type: string;
  company_size: string;
  comany_desc: string;
  mstr_qty: string;
  risk: string;
  market_cap: string;
  country: string;
  founding_year: string;
  investment_frequency: string;
  price: string;
  SDG_solved: string;
  industry: string;
  min_amnt_invest: string;
  impact_categorey: string;
  investment_body: string;
  score: string;
  transperancy_score: string;
  enviroment_score: string;
  social_score: string;
  govern_score: string;
  global_rank: string;
  industry_rank: string;
  blob: string;
  blob2: string;
  blob3: string;
}

export interface Orders {
  addedBy: number;
  blob: string;
  createdAt: string;
  id: number;
  investment_id: number;
  isActive: boolean;
  isCancelled: boolean;
  isCo_own: boolean;
  isDeleted: boolean;
  isOpen: boolean;
  isSelled: boolean;
  isin: any;
  qty: number;
  strike_price: string;
  updatedAt: string;
  updatedBy: any;
}
