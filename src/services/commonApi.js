import axios from "axios";

const commonApi=async (apiUrl,apiMethod,apiHeaders,apiBody)=>{

    const config={
        url:apiUrl,
        method:apiMethod,
        headers:apiHeaders?apiHeaders:{"Content-Type":"application/json"},
        data:apiBody
    }

    return await axios(config).then(res=>res).catch(err=>{
        console.log(err)
        return err
    }
    )
}

export default commonApi