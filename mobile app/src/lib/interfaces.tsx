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
    SDGs: string
    adLink: string
    addrLine1: string
    addrline2: string
    city: string
    demLink: string
    dob: string
    email: string
    experience: string
    fname: string
    hobbies: string
    imgLink: string
    income: string
    lname: string
    middle: string
    otp: string
    phone: string
    pinCode: string
    profession: string
    singLink: string
    state: string
  }
  