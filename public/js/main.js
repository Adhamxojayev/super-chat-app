username.textContent = localStorage.getItem('username')
const client = io();

// random avatar icon generator
let user1 = 'https://banner2.cleanpng.com/20180430/jge/kisspng-computer-icons-font-awesome-hamburger-button-5ae723a4ebfc72.3953800615250973809666.jpg'
let user2 = 'https://e7.pngegg.com/pngimages/109/994/png-clipart-teacher-student-college-school-education-avatars-child-face.png'
let user3 = 'https://thumbs.dreamstime.com/b/smiling-avatar-girl-graphic-wearing-dark-clothes-eyeglasses-front-view-over-isolated-background-illustration-73284769.jpg'
let user4 = 'https://thumbs.dreamstime.com/z/woman-hipster-avatar-beauty-woman-hipster-avatar-vector-illustration-design-108268272.jpg'
let user5 = 'https://www.clipartmax.com/png/full/402-4029753_acupuncture-wang-inc-acupuncture-wang-inc.png'
let avatarMale = [user1, user2, user5];
let avaterFamale = [user3, user4];



// all users render
( async () => {
    let res = await fetch('http://localhost:5000/users')
    res = await res.json()
    friends.innerHTML = null
    for(let user of res.data){
        if(document.cookie.split('=')[1] != user.id){
            friends.innerHTML += `<div class="row sideBar-body" onclick=chat(this)>
              <div class="col-sm-3 col-xs-3 sideBar-avatar">
              <div class="avatar-icon">
              <img src= ${ user.gender == 'male' ? avatarMale[Math.floor(Math.random() * 3)] : avaterFamale[Math.floor(Math.random() * 2)]}>
              </div>
              </div>
              <div class="col-sm-9 col-xs-9 sideBar-main">
              <div class="row">
              <div class="col-sm-8 col-xs-8 sideBar-name">
              <span class="name-meta" id="${user.id}">${user.username}
              </span>
              </div>
              <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
              <span style="color: green;" class="time-meta pull-right">online
              </span>
              </div>
              </div>
              </div>
              </div>`
        }
    }
})()

let u = null
async function chat (user) {
    let id = user.childNodes[3].childNodes[1].childNodes[1].childNodes[1].id
    u = user.childNodes[3].childNodes[1].childNodes[1].childNodes[1].id
    friendProfile.innerHTML = `<div id=${id} class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
    <div class="heading-avatar-icon">
      <img src="${user.childNodes[1].childNodes[1].childNodes[1].src}">
    </div>
    </div>
    <div class="col-sm-8 col-xs-7 heading-name">
      <p class="heading-name-meta">${user.childNodes[3].childNodes[1].childNodes[1].childNodes[1].textContent}</p>
    </div>
    <div class="col-sm-1 col-xs-1  heading-dot pull-right">
    <i onclick="deleteChat()" class="fa fa-trash pull-right" aria-hidden="true"></i>
    </div>`

    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hour = t.getHours()
    const min = t.getMinutes()
    const secund = t.getSeconds()

    const time = `${date}-${month}-${year}T${hour}:${min}:${secund}`;

    sendMessage.onclick = async () => {
      let user = {
            user_id: document.cookie.split('=')[1],
            receiver_id: u, 
            massage : comment.value
      }
      client.emit('new_message', user)
      if( document.cookie.split('=')[1] == user.user_id && id == user.receiver_id){
        conversation.innerHTML += `<div class="row message-body">
        <div class="col-sm-12 message-main-sender">
        <div class="sender">
        <div class="message-text">
        ${user.massage}
        </div>
        <span class="message-time pull-right">
        ${ time }
        </span> 
        </div>
        </div>
        </div>`
      }
      comment.value = ' '
    }


    conversation.innerHTML = null
    client.on('send_message', (data) => {
      if(document.cookie.split('=')[1] == data.receiver_id && id == data.user_id){
        conversation.innerHTML += `<div class="row message-body">
          <div class="col-sm-12 message-main-receiver">
          <div class="receiver">
          <div class="message-text">
          ${data.massage}
          </div>
          <span class="message-time pull-right">
              ${data.created_at}  
              </span>
              </div>
              </div>
              </div>`
      }else if(document.cookie.split('=')[1] == data.user_id && id == data.receiver_id){
            conversation.innerHTML += `<div class="row message-body">
            <div class="col-sm-12 message-main-sender">
            <div class="sender">
            <div class="message-text">
            ${data.massage}
            </div>
            <span class="message-time pull-right">
            ${data.created_at}
            </span> 
            </div>
            </div>
            </div>`
          } 
        })

        let response = await (await fetch(`http://localhost:5000/message`)).json()
        for(let message of response.data){ 
          // chat receiver and sender render data
          if(document.cookie.split('=')[1] == message.receiver_id && id == message.user_id){
            conversation.innerHTML += `<div class="row message-body">
            <div class="col-sm-12 message-main-receiver">
                <div class="receiver">
                <div class="message-text">
                ${message.massage}
                </div>
                <span class="message-time pull-right">
                ${message.created_at}  
                </span>
                </div>
            </div>
            </div>`
        }else if(document.cookie.split('=')[1] == message.user_id && id == message.receiver_id){
            conversation.innerHTML += `<div class="row message-body">
            <div class="col-sm-12 message-main-sender">
              <div class="sender">
                <div class="message-text">
                  ${message.massage}
                </div>
                <span class="message-time pull-right">
                ${message.created_at}
                </span> 
              </div>
            </div>
          </div>`
        }      
    }
}