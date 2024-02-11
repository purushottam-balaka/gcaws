const AWS=require('aws-sdk');
const expense_table=require('../model/expenses');

exports.download_expenses=async(req,res)=>{
    try{
        const expense=await expense_table.findAll({where:{UserId:req.user.id}})
        const stringifiedExpenses=JSON.stringify(expense);
        const filename=`Expense${req.user}/${new Date()}.txt`;
        const fileURL=await uploadToS3(stringifiedExpenses,filename);
        // console.log('File url',fileURL)
        res.status(200).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({success:false,err:err})
    }
   
}

async function uploadToS3(data,filename){
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;
    
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })
              var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read',
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3resp)=>{
                if(err){
                    console.log('something went wrong',err)
                    reject(err)
                }else{
                    //console.log('response',s3resp.Location)
                    resolve(s3resp.Location);
                }
            })
        })
           
}

