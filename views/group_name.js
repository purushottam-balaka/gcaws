async function createGroup(e){
    try{        
        e.preventDefault()
        const grpName={
            name:e.target.grpName.value,
        }
        // console.log('grp',grpName)
        const token=localStorage.getItem('token')
        const res= await axios.post('http://13.235.2.168:9000/req_users',grpName,{headers:{'Authorization':token}})
        console.log('res',res)
        showUser(res.data.urs,res.data.gId)
    }catch(err){
        console.log(err)
    }
}

function showUser(element,g_id){
    document.getElementById('paragraph').innerHTML='Add users'
    const parentEle=document.getElementById('list')
    console.log('show',element)
    element.forEach(ele => {
        const childEle=document.createElement('li');
        childEle.setAttribute('class','list-group-item')
        childEle.textContent=ele.name+'   ';
        const addBut=document.createElement('button')
        addBut.id=ele.id;
        addBut.value=localStorage.getItem('grName');
        addBut.textContent=' Add '
        parentEle.appendChild(childEle)
        childEle.appendChild(addBut)
        addBut.onclick=async()=>{
            const details={
                id:addBut.id,
                gId:g_id,
            }
            const token=localStorage.getItem('token')
            await axios.post('http://13.235.2.168:9000/add_user',details,{headers:{'Authorization':token}})
            .then(()=>{
                addBut.textContent='Added';
                addBut.style.backgroundColor ='lightgreen';
            }).catch((err)=>{
                console.log(err)
            })
           

        }
    });
}
