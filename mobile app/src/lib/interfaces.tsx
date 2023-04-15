export interface User {
    id: number
    email: string
    name: any
    userType: number
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    addedBy: any
    updatedBy: any
    phone_number: any
    profile_img: any
    sign_img: any
    address_line_1: any
    address_line_2: any
    crater_name: any
    colony_name: any
    pincode: any
    age: any
    profession: any
    experience: any
    dob: any
    hobbies: any
    SDGs: any
    investment_frequency: any
    company_domains: any
    impact_domains: any
    notif_token: any
    isAuth: boolean | null
    blob: any
    mobileNo: any
    token: string
  }
  

  export interface UserSignUp {
    SDGs: any
    adLink: string
    addedBy: any
    addrLine1: string
    address_line_1: any
    address_line_2: any
    addrline2: string
    age: any
    blob: any
    city: string
    colony_name: any
    company_domains: any
    crater_name: any
    createdAt: string
    demLink: string
    dob: any
    email: string
    experience: any
    fname: string
    hobbies: any
    id: number
    imgLink: string
    impact_domains: any
    income: string
    investment_frequency: any
    isActive: boolean
    isAuth: any
    isDeleted: boolean
    lname: string
    middle: string
    mobileNo: any
    name: any
    notif_token: any
    otp: string
    phone: string
    phone_number: any
    pinCode: string
    pincode: any
    profession: any
    profile_img: any
    sign_img: any
    singLink: string
    state: string
    token: string
    updatedAt: string
    updatedBy: any
    userType: number
  }
  