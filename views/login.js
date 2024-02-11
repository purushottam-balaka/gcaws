
async function login(e){
    try{
        e.preventDefault();
        const details={
            email:e.target.email.value,
            password:e.target.password.value,
        }
        const resp=await axios.post('http://13.235.2.168:9000/login',details)
        alert(resp.data.message);
        localStorage.setItem('token',resp.data.token);
        window.location.href='./chat.html';
    }catch(err){
        if(err=='AxiosError: Request failed with status code 404'){
            alert('User does not existed')
            }
        else if(err=='AxiosError: Request failed with status code 401'){
            alert("You have entered wrong password")
        }
        else{
            alert("Something went wrong")
        }
    }
}

function signup_page(){
    window.location.href="./signup.html"
}