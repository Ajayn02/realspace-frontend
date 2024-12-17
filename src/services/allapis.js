import commonApi from "./commonApi";
import base_url from './base_url'


export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, "POST", "", data)
}

// post
export const addPostApi = async (header, data) => {
    return await commonApi(`${base_url}/addpost`, "POST", header, data)
}

export const getUserPostApi=async(header)=>{
    return await commonApi(`${base_url}/userposts`,"GET",header,"")
}

export const getViewPost=async(header,id)=>{
    return await commonApi(`${base_url}/viewpost/${id}`,"GET",header,'')
}

export const deletePostApi=async(header,id)=>{
    return await commonApi(`${base_url}/deletepost/${id}`,"DELETE",header,{})
}

export const getAllPosts=async(header,searchkey)=>{
    return await commonApi(`${base_url}/getallposts?searchkey=${searchkey}`,"GET",header,"")
}

// user
export const getUserApi=async(header)=>{
    return await commonApi(`${base_url}/getuser`,"GET",header,"")
}

export const getAllUsers=async(header)=>{
    return await commonApi(`${base_url}/getalluser`,"GET",header,"")
}

export const updateUserApi=async(header,data)=>{
    return await commonApi(`${base_url}/updateuser`,"PUT",header,data)
}

// save
export const addSaveApi=async(header,data)=>{
    return await commonApi(`${base_url}/addsave`,"POST",header,data)
}

export const getSavedApi=async(header)=>{
    return await commonApi(`${base_url}/getsaved`,"GET",header,"")
}

export const unsaveApi=async(header,id)=>{
    return await commonApi(`${base_url}/unsave/${id}`,"DELETE",header,{})
}

// chat

export const addchatApi=async(header,data)=>{
    return await commonApi(`${base_url}/addchat`,"POST",header,data)
}

export const getchatsApi=async(header)=>{
    return await commonApi(`${base_url}/getchats`,"GET",header,"")
}

export const getOneChatApi=async(header,id)=>{
    return await commonApi(`${base_url}/getonechat/${id}`,"GET",header,"")
}

export const sendChatApi=async(header,data,id)=>{
    return await commonApi(`${base_url}/addmsg/${id}`,"PUT",header,data)
}

export const delChatAPi=async(header,id)=>{
    return await commonApi(`${base_url}/delchat/${id}`,"DELETE",header,{})
}

//admin

export const adminLogApi=async(header,data)=>{
    return await commonApi(`${base_url}/admin`,"POST",header,data)
}

//post-report

export const addReportApi=async(header,data)=>{
    return await commonApi(`${base_url}/addreport`,"POST",header,data)
}

export const getReportsApi=async(header)=>{
    return await commonApi(`${base_url}/allreports`,"GET",header,"")
}

export const removeReport=async(header,id)=>{
    return await commonApi(`${base_url}/delreport/${id}`,"DELETE",header,{})
}

//other-reports

export const addotherRepApi=async(header,data)=>{
    return await commonApi(`${base_url}/addotherrep`,"POST",header,data)
}

export const getOtherRepApi=async(header)=>{
    return await commonApi(`${base_url}/getotherrep`,"GET",header,"")
}

export const delOtherRepApi=async(header,id)=>{
    return await commonApi(`${base_url}/delotherrep/${id}`,"DELETE",header,{})
}