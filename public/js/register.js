
submitSignup.onclick = async (e) => {
    e.preventDefault()
    let response = await fetch('http://localhost:5000/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameSignup.value,
            age: ageSignup.value,
            gender: genderSignup.value,
            password: passwordSignup.value
        })
    })
    let result = await response.json()
    if(result.status == 201){
        localStorage.setItem('username', result.data);
        window.location.href = '/'
    } 
}



submitLogin.onclick = async (e) => {
    e.preventDefault()
    let response = await fetch('http://localhost:5000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameLogin.value,
            password: passwordLogin.value
        })
    })
    let result = await response.json()
    if(result.status == 200){
        localStorage.setItem('username', result.data);
        window.location.href = '/'
    } 
}




