export const validateEmail = (email) =>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
export const validatePassword = (pass) =>{
    const regex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/ ;
    return regex.test(pass);
}
export const getInitial =(name)=>{
    if(!name){return "";}
    const word=name.split(" ");
    let initials="";
    for(let i=0;i<Math.min(word.length,2);i++){
        initials+=word[i][0];
    }
    return initials.toUpperCase();
}