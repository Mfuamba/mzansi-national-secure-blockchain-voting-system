// src/apollo/queries.js
import { gql } from '@apollo/client';
//DONE
export const VERIFY_ID = gql`
  query VerifyID($id: String!) {
    verifyID(id: $id)
  }
`

//DONE
export const getDashboardTotal = `query GetDashboardTotal($startingDate: String, $endingDate: String,$restaurant:String!){
  getDashboardTotal(startingDate: $startingDate, endingDate: $endingDate,restaurant:$restaurant){
    totalOrders
    totalSales
  }
}`
//DONE
export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String,$restaurant:String!){
  getDashboardSales(startingDate: $startingDate, endingDate: $endingDate,restaurant:$restaurant){
    orders{
      day
      amount
    }
  }
}`
//DONE
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String,$restaurant:String!){
  getDashboardOrders(startingDate: $startingDate, endingDate: $endingDate,restaurant:$restaurant){
    orders{
      day
      count
    }
  }
}`
//DONE
export const getDashboardData = `query GetDashboardData($startingDate: String, $endingDate: String){
  getDashboardData(starting_date: $startingDate, ending_date: $endingDate){
    totalOrders
    totalUsers
    totalSales
    orders{
      day
      count
      amount
    }
  }
}`;
