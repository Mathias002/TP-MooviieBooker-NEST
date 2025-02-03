
user = {
    Name: 'Lala',
    email: 'lala.deviluke@gmail.com',
    Age: 18,
}


function generateToken(user) {

    console.log(user);

    var encodedUser = btoa(JSON.stringify(user));

    console.log(encodedUser);

    return encodedUser;
}

function verifyToken(Token) {

    console.log(Token);

    var decodedUser = JSON.parse(atob(Token));

    console.log(decodedUser);

    return decodedUser;
}

const token = generateToken(user); 
const decodedUser = verifyToken(token); 

console.log("Les données sont-elles identiques?", 
    JSON.stringify(user) === JSON.stringify(decodedUser));