/* eslint-disable prefer-template */
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { baseUrl } from './baseUrl';
import { bearerToken } from './bearerToken';

// ----------------------------------------------------------------------
export const getActiveUserList = async () => {
  const userList = [];
  const apiRes = await fetch(`${baseUrl}/admin/user/list`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log("the received data is below")
  console.log(result.data.data);
  result.data.data.forEach((val) => {
    userList.push({
      id: val.id,
      name: val.name,
      email: val.email,
      address: val.address_line_1 + ' ' + val.address_line_2 + ' ' + val.crater_name + ' ' + val.colony_name ,
      age: val.age,
      profession: val.profession,
      hobbies: val.hobbies,
      SDGs: val.SDGs,
      investment_frequency: val.investment_frequency,
      company_domains: val.company_domains,
      impact_domains: val.impact_domains,
      mobileNo: val.mobileNo,
      notif_token: val.notif_token,
      dob: val.dob,
      isAuth: val.isAuth,
    });
  });
  return userList;
  // users.push();
};
export const getInvestmentList = async () => {
  const users = [];
  const apiRes = await fetch(`${baseUrl}/admin/investment/list`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log(`The recieved data is ${result.data.data}`);
  result.data.data.forEach((val) => {
    users.push({
      id: val.id,
      name: val.name,
      company_img: val.company_img,
      sub_heading: val.sub_heading,
      description: val.description,
      comapny_size: val.comapny_size,
      comany_desc: val.comany_desc,
      mstr_qty: val.mstr_qty,
      risk: val.risk,
      market_cap: val.market_cap,
      country: val.country,
      founding_year: val.founding_year,
      investment_frequency: val.investment_frequency,
      price: val.price,
      SDG_solved: val.SDG_solved,
      industry: val.industry,
      min_amnt: val.min_amnt,
      impact_category: val.impact_category,
      investment_body: val.investment_body,
      score: val.score,
      global_rank: val.global_rank,      
    });
  });
  return users;
  // users.push();
};

export const getUserTransactions = async () => {
  const userTransactions = [];
  const apiRes = await fetch('http://192.168.137.173:5000/admin/open_order/list', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
      'Content-Type': 'application/json',
    },
  });
  const result = await apiRes.json();
  console.log(result.data.data);
  result.data.data.forEach((val) => {
    userTransactions.push({
      id: val.id,
      qty: val.qty,
      blob: val.blob,
      isSell: val.isSell,
      isCancelled: val.isCancelled,
      isOpen: val.isOpen,
      strike_price: val.strike_price,
      isin: val.isin,
      createdAt: val.createdAt,
    });
  });
  return userTransactions;
  // users.push();
};



const userList = [].map((_, index) => ({
  name: faker.name,
  email: faker.email,
  phone_number: faker.phone_number,
  profile_img: faker.profile_img,
  sign_img: faker.sign_img,
  aadhar_img: faker.aadhar_img,
  address: faker.address_line_1 + ' ' + faker.address_line_2 + ' ' + faker.city + ' ' + faker.state,
  dob: faker.dob,
  isAuth: true,
}))

export default userList;

export const userTransactions = [].map((_, index) => ({
  id: faker.id,
  qty: faker.qty,
  blob: faker.blob,
  isSell: faker.isSell,
  isCancelled: faker.isCancelled,
  isOpen: faker.isOpen,
  strike_price: faker.strike_price,
  isin: faker.isin,
  createdAt: faker.createdAt,

}))

