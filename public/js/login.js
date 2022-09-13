const loginFormHandler = async (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(username, password);
    console.log(JSON.stringify({username, password}));

    if (username && password) {
        const userLogin = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            header: { 'Content-Type': 'application/json' },
        })
        .then((userLogin) => {
            console.log(userLogin);
            if (userLogin.ok) {
                document.location.replace('/posts');
            } else {
                console.log("Something went wrong!");
            }
        })  
        .catch((err) => {
            console.log(err);
        });
    } else {
        console.log("Please make sure that you enter both a username and password!");
        alert("Please make sure that you enter both a username and password!");
    };
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);