const loginFormHandler = async (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    const data = {
        username: username,
        password: password
    }

    console.log(username, password);
    console.log(JSON.stringify({username, password}));

    if (username && password) {
        console.log("Sending API Request");
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            header: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/posts');
        } else {
            alert("We are not able to log you in successfully. Please try again!")
            console.log(response.message);
        }

    } else {
        console.log("Please make sure that you enter both a username and password!");
        alert("Please make sure that you enter both a username and password!");
    };
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);