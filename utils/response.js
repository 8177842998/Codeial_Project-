module.exports={
    success : (res,data,mesg)=>{
        return res.status(200).json({
            SUCCESS: true,
            DATA : data,
            MESSAGE : mesg
        });
    },
    created : (res,data,mesg)=>{
        return res.status(201).json({
            SUCCESS: true,
            DATA : data,
            MESSAGE : mesg
        });
    },
    failure : (res,data,mesg)=>{
        return res.status(500).json({
            SUCCESS: false,
            DATA : data,
            MESSAGE : mesg
        });
    },
    unauthorized : (res,data,mesg)=>{
        return res.status(401).json({
            SUCCESS: false,
            DATA : data,
            MESSAGE : mesg
        });
    }
}