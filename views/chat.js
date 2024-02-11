
window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token')
        const grp=await axios.get('http://13.235.2.168:9000/groups',{headers:{'Authorization':token}})
        // console.log('group',grp)
        showGroups(grp.data.groups);


        // const token=localStorage.getItem('token');
        // let lastId=localStorage.getItem('lastId');
        // // console.log(lastId)
        // const allMsgs=[]
        //  const response=await axios.get('http://13.235.2.168:9000/get_message',lastId,{headers:{'Authorization':token}})
        //     response.data.msg.forEach(ele => {
        //         allMsgs.push(ele)
        //         lastId=ele.id;
        //     });
        //     const allMsgsStrigified=JSON.stringify(allMsgs)
        //     localStorage.setItem('message',allMsgsStrigified)
        //     localStorage.setItem('lastId',lastId);
        //     showMessage();
    }catch(err){
        console.log(err);
    }
})

// setInterval(async() => {
//     const token=localStorage.getItem('token');
//     const response=await axios.get('http://13.235.2.168:9000/get_message',{headers:{'Authorization':token}})
//     //console.log(response)
//     showMessage(response.data.msg);
// }, 1000);

async function save_message(e){
    try{
        e.preventDefault();
        const id=localStorage.getItem('id')
        const data={
            message:e.target.message.value,
            gId:id,
        }
        const token=localStorage.getItem('token');
        await axios.post('http://13.235.2.168:9000/add_message',data,{headers:{'Authorization':token}})
        .then((resp)=>{
            window.location.reload();
            // console.log('reloaded')
        }).catch((err)=>{
            console.log(err)
        })
       
    }catch(err){
        console.log(err)
    }
}

function showMessage(){
    const parentEle=document.getElementById('list');
    parentEle.innerHTML=''
    const i=localStorage.getItem('message')
    const item=JSON.parse(i)
    console.log(item)
    for(let i=0;i<item.length;i++){
    const childEle=document.createElement('li');
    childEle.setAttribute('class','list-group-item');
    childEle.textContent=item[i].name +' : '+ item[i].message;
    parentEle.append(childEle)
    }
}

function create_a_group(){
    window.location.href='./group_name.html'
}

function showGroups(ele){
    const parentEle=document.getElementById('group-list')
    parentEle.innerHTML=''
    document.getElementById('group-heading').innerHTML='Groups : '
    ele.forEach(element => {
        // console.log('element',element)
        const childEle=document.createElement('li');
        childEle.setAttribute('class','list-group-item')
        childEle.textContent=element.group.group_name;
        childEle.id=element.group.id;
        
        parentEle.appendChild(childEle);
        childEle.onclick=async()=>{
            const id={
                id:childEle.id,
            }
            const grpMembers=document.getElementById('grp-members')
            const mem=await axios.post('http://13.235.2.168:9000/grp_members',id)
            // console.log(mem)
            // showGropMembers(mem.data.users.isAdmin,mem.data.users.user.name)
            showGropMembers(mem.data.users)

            localStorage.setItem('id',childEle.id)
            const parentElem=document.getElementById('grp-msg-list');
            parentElem.innerHTML=''
            const grpId={
                gId:childEle.id,
            }
            const li=document.createElement('li');
            li.setAttribute('class','list-group-item')
            li.textContent=`Group name :  ${childEle.textContent}   `;
            parentElem.appendChild(li)
            const button=document.createElement('button');
            button.setAttribute('class','btn btn-info');
            button.textContent='Add a user';

            li.appendChild(button);
            const delBut=document.createElement('button');
            delBut.textContent='Delete user'
            delBut.setAttribute('class','btn btn-danger');
            li.appendChild(delBut)
            button.onclick=async()=>{
                let inp=document.createElement('input');
                inp.type='text';
                inp.setAttribute('class','list-group-item')
                let but=document.createElement('button');
                but.setAttribute('class','btn btn-info')
                but.textContent=' Add ';
                but.id='add-but'
                parentElem.appendChild(inp);
                parentElem.appendChild(but) 
                but.onclick=async()=>{
                    const name={
                        uname:inp.value,
                        gId:childEle.id,
                    }
                    const token=localStorage.getItem('token')
                    await axios.post('http://13.235.2.168:9000/add_more_users',name,{headers:{'Authorization':token}})
                    .then((resp)=>{
                        if(resp.status==200){
                        but.style.background='lightgreen',
                        but.textContent='Added'
                            }
                        else{
                            but.style.background='red',
                            but.textContent='User is not an Admin'
                        }
                    })
                    }          
            }
            delBut.onclick=()=>{
                // console.log('delete')
                let inp=document.createElement('input');
                inp.type='text';
                inp.setAttribute('class','list-group-item')
                let but=document.createElement('button');
                but.textContent=' Delete ';
                but.setAttribute('class','btn btn-danger')
                but.id='del-but'
                parentElem.appendChild(inp);
                parentElem.appendChild(but) 
                but.onclick=async()=>{
                    const name={
                        uname:inp.value,
                        gId:childEle.id,
                    }
                    const token=localStorage.getItem('token')
                    await axios.post('http://13.235.2.168:9000/delete_group_user',name,{headers:{'Authorization':token}})
                    .then((resp)=>{
                        if (resp.status==200){
                        but.style.background='lightgreen',
                        but.textContent='Deleted'
                        }
                        else{
                            but.style.background='red',
                            but.textContent='User is an Admin '
                        }
                    })
                    } 
            }
            const grpMsgs=await axios.post('http://13.235.2.168:9000/group_msgs',grpId);
                grpMsgs.data.grpMsgs.forEach(ele =>{
                    const childElem=document.createElement('li');
                    childElem.setAttribute('class','list-group-item list-group-item-info');
                    childElem.textContent=ele.name +' : ' +ele.message;
                    // console.log('childId',parentEle)
                    parentElem.appendChild(childElem);
                })
        }
    });   

    function showGropMembers(element){
        const parentEle=document.getElementById('grp-members');
        document.getElementById('grp-members-heading').innerHTML='Group members'
        parentEle.innerHTML=''
        element.forEach(ele => {
            const childEle=document.createElement('li')
            childEle.textContent=ele.user.name+'  -   ';
            childEle.setAttribute('class','list-group-item');
            childEle
            if (ele.isAdmin == 1){
                var subChiEle=document.createTextNode(' ');
                subChiEle.textContent='Admin'
            }
            else{
                var subChiEle=document.createElement('button')
                subChiEle.setAttribute('class','btn btn-info')
                subChiEle.id=ele.user.id;
                subChiEle.value=ele.groupId;
                subChiEle.textContent='Make Admin'
                subChiEle.onclick=async()=>{
                    const data={
                        uId:subChiEle.id,
                        gId:subChiEle.value,
                    }
                    const token=localStorage.getItem('token');
                    await axios.post('http://13.235.2.168:9000/make_admin',data,{headers:{'Authorization':token}})
                    .then((resp)=>{
                        if(resp.status==200){
                        subChiEle.style.background='lightgreen';
                        subChiEle.textContent='Admin';
                        }
                        else{
                            subChiEle.style.background='red';
                            subChiEle.textContent='User is not an Admin';
                        }
                    })
                }
            }
            parentEle.appendChild(childEle)
            childEle.appendChild(subChiEle)
        });

    }

}