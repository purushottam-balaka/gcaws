
async function signup_details(e){
    try{
        e.preventDefault();
        const details={
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value,
            phone:e.target.phone.value,
        }
    
        await axios.post('http://13.232.98.159:9000/signup',details)
        .then((resp)=>{
            alert(resp.data.message)
            window.location.href='./login.html'
        })
        .catch(err=>{
            console.log(err)
        })
        
    }catch(err){
        console.log(err);
    }
}

function login_page(){
    window.location.href="./login.html";
}