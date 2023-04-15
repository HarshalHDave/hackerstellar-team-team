import axios from "axios";
import { baseUrl } from "./BaseUrl";
import { UserSignUp } from "./interfaces";

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
  console.log(pass)
  console.log(obj)
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
