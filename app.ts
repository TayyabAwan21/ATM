#! /usr/bin/env node

import { faker } from "@faker-js/faker/locale/af_ZA";
import inquirer from "inquirer";

interface User {
    id:number ; pin:number; name:string;
    acctNum:number; balance:number;
}

const creat_user=()=>{
    const users:User[]=[]
    for (let i=1; i<9; i++) {
        const user:User={
        id:i, pin:1000 + i, name:faker.person.fullName(),
        acctNum:Math.floor(Math.random() *1000000),
        balance:100000 * i
        }
    users.push(user)
    }
    return users
}
 const user= creat_user()
const atm=async (users:User[])=>{
    const res= await inquirer.prompt({
        name:"pin" , message:"Enter Pin",
        type:"number" 
    })
const user= users.find(val=>val.pin == res.pin)
if(user) {console.log(`Welcome ${user.name}`);     
       atmFunc(user)   }
else {console.log("Invalid User")}

}
atm(user)

const atmFunc= async(user:User)=>{
    const func= await inquirer.prompt({
        name:"name", type:"list", message:"Choose an Action",
        choices:["Withdraw","Deposit","CheckBalance","Exit"]
      })
    if(func.name == "Withdraw") {
        const amount= await inquirer.prompt({
            name:"money", type:"number",
            message:"Enter the amount to be withdrawn"
        })
        if(amount.money < user.balance) {
            console.log(`${user.name} account is debited by ${amount.money}`);
            console.log(`your balance is ${user.balance -amount.money} `)
        }
        else{console.log("Insufficent Balance")}
    }
    
    if(func.name == "Deposit") {
        const amount= await inquirer.prompt({
            name:"money", type:"number",
            message:"Enter the amount to be deposited"
        })
        console.log(`${user.name} account is credited by ${amount.money}`);
        console.log(`your balance is ${user.balance + amount.money} `)   
    }
    
    if(func.name == "CheckBalance") {
        console.log(`${user.name} your balance is ${user.balance}`)
    }
    
    if(func.name == "Exit") {
        console.log("Thanls for Using ATM")
    }
}

    





    


