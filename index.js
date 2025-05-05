let submitbtn = document.querySelector("#submitbtn");
let username = document.querySelector("#username");
let listdata = document.querySelector("#listalldata");
let image = document.querySelector("#img");
let follwers = document.querySelector("#followers");
let following = document.querySelector('#following');
let name = document.querySelector(".name");
let date = document.querySelector("#date");
let gits = document.querySelector("#gits");
let repo = document.querySelector("#repo");
let update  = document.querySelector("#update")
let profilehead = document.querySelector(".container form");

function backgroundchanger()
{
    let num1  = Math.random()*256;
    let num2  = Math.random()*256;
    let num3  = Math.random()*256;
    let num4  = Math.random()*256;
    let num5  = Math.random()*256;
    let num6  = Math.random()*256;
    
    profilehead.style.backgroundColor = `rgb(${num1},${num2},${num3})`
}

setInterval(backgroundchanger,3000);

submitbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let ans = fetchdata();
    ans.then((res)=>{
        image.src = res.avatar_url;
        follwers.innerHTML = res.followers;
        following.innerHTML = res.following;
        name.innerHTML = res.name?res.name:res.login;  
        date.innerHTML = res.created_at;
        gits.innerHTML = res.public_gists;
        repo.innerHTML = res.public_repos;
        update.innerHTML = res.updated_at;
        console.log(res);       
    })
});

function fetchdata()
{
   username.value = username.value.trim();
   return fetch(`https://api.github.com/users/${username.value}`).then((res)=>res.json()).catch((err)=>console.log(err)
   )
}