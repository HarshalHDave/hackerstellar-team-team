import axios from "axios";
import { baseUrl } from "./BaseUrl";
import { StockData, UserSignUp } from "./interfaces";

export const loginFun = async (uname: string, pass: string) => {
  const res = await axios.post(baseUrl + "/admin/auth/login", {
    username: uname,
    password: pass,
  });
  console.log(res.data);
  return res.data.data;
};
export const SignUpFun = async (
  obj: UserSignUp,
  pass: string,
  token: string
) => {
  console.log(pass);
  console.log(obj);
  const res = await axios.post(
    baseUrl + "/admin/user/create",
    {
      password: pass,
      email: obj.email,
      name: obj.fname + " " + obj.lname,
      userType: 2,
      phone_number: obj.phone,
      profile_img: obj.imgLink,
      sign_img: obj.singLink,
      address_line_1: obj.addrLine1,
      address_line_2: obj.addrline2,
      crater_name: obj.fname + " " + obj.lname,
      colony_name: obj.state,
      pincode: obj.pinCode,
      age: 50,
      profession: obj.profession,
      experience: obj.experience,
      dob: obj.dob,
      hobbies: obj.hobbies,
      SDGs: obj.SDGs,
      investment_frequency: "",
      company_domains: "wireless",
      impact_domains: "cross-platform",
      notif_token: token,
      isAuth: false,
      blob: "Cotton",
      mobileNo: null,
      username: obj.fname,
    },
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJmaUBnbWFpbC5jb20iLCJpYXQiOjE2ODE1NTkwMTAsImV4cCI6MTY4MjE1OTAxMH0.Vj9Jzislqm4qvCFVTLeqy1lluoUxPh6hrIHIrmwTN4g",
      },
    }
  );
  console.log(res.data);
  return res.data.status == "SUCCESS";
};

export const giveSorted = (arr: StockData[], foo: string) => {

  if (foo == "0") {
    let sorted = arr.sort((p1, p2) =>
      p1.market_cap > p2.market_cap ? 1 : p1.market_cap < p2.market_cap ? -1 : 0
    );
    return sorted;
  }
  if (foo == "1") {
    let sorted = arr.sort((p1, p2) =>
      p1.score > p2.score ? 1 : p1.score < p2.score ? -1 : 0
    );
    return sorted;
  }
  if (foo == "2") {
    let sorted = arr.sort((p1, p2) =>
      p1.transperancy_score > p2.transperancy_score
        ? 1
        : p1.transperancy_score < p2.transperancy_score
        ? -1
        : 0
    );
    return sorted;
  }
  if (foo == "3") {
    let sorted = arr.sort((p1, p2) =>
      p1.enviroment_score > p2.enviroment_score
        ? 1
        : p1.enviroment_score < p2.enviroment_score
        ? -1
        : 0
    );
    return sorted;
  }
  if (foo == "4") {
    let sorted = arr.sort((p1, p2) =>
      p1.social_score > p2.social_score
        ? 1
        : p1.social_score < p2.social_score
        ? -1
        : 0
    );
    return sorted;
  }
  if (foo == "5") {
    let sorted = arr.sort((p1, p2) =>
      p1.govern_score > p2.govern_score
        ? 1
        : p1.govern_score < p2.govern_score
        ? -1
        : 0
    );
    return sorted;
  }
};
export const giveInvOption = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [
      ...arr.filter((item) => item.investment_type == val),
      ...finalArr,
    ];
  });
  return finalArr;
};
export const giveCompanySize = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [
      ...arr.filter(
        (item) => item.company_size.toLowerCase() == val.toLowerCase()
      ),
      ...finalArr,
    ];
  });
  return finalArr;
};
export const giveRisk = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [...arr.filter((item) => item.risk == val), ...finalArr];
  });
  return finalArr;
};
export const giveCountry = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [...arr.filter((item) => item.country == val), ...finalArr];
  });
  return finalArr;
};
export const giveInvFreq = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [
      ...arr.filter((item) => item.investment_frequency == val),
      ...finalArr,
    ];
  });
  return finalArr;
};
export const giveCompInd = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [...arr.filter((item) => item.industry == val), ...finalArr];
  });
  return finalArr;
};
export const giveImpDom = (arr: StockData[], foo: string[]) => {
  let finalArr: any[] = [];
  console.log(foo);
  foo.forEach((val) => {
    finalArr = [
      ...arr.filter((item) => item.impact_categorey == val),
      ...finalArr,
    ];
  });
  return finalArr;
};
export const giveMinAmm = (arr: StockData[], foo: number) => {
  console.log(foo);
  return arr.filter((val) => {
    console.log(Number(val.min_amnt_invest));
    return Number(val.min_amnt_invest) < foo;
  });
};
