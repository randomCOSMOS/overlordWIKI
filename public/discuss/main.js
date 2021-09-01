fetch('/loggedIn')
    .then(res => res.json())
    .then(json => {
        content1 = `<a onclick="signOut()" href="javascript:void(0)"><li>Sign Out</li></a>`
        if (json.loggedIn) {
            $("nav ul").append(content1)
            $(".comment").css("display", "flex")
        } else {
            $(".sign").css("display", "flex")
        }
    })

fetch("/comments")
    .then(res => res.json())
    .then(json => {
        for (i = 0; i < json.length; i++) {
            content = `<section class="post">
            <p>${json[i].author} <i>${json[i].date}</i> <b onclick="remove('${json[i]._id}', '${json[i].author}')">Delete</b></p>
            <article>${json[i].comment}</article>
            </section>`
            $("main").after(content)
        }
    })

const signIn = async () => {
    const data = {
        username: $("#username").val(),
        password: $("#password").val(),
        loggedIn: "true"
    }

    if (data.username.length == 0) {
        alert("Username Field Cannot be Empty")
        return (null)
    } else if (data.password.length == 0) {
        alert("Password Field Cannot be Empty")
        return (null)
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("/signIn", option)
        .then(res => res.json())
        .then(json => json.duplicate ? alert("Username Already exists") : location.reload())
}

const logIn = () => {
    const data = {
        username: $("#username").val(),
        password: $("#password").val(),
    }

    if (data.username.length == 0) {
        alert("Username Field Cannot be Empty")
        return (null)
    } else if (data.password.length == 0) {
        alert("Password Field Cannot be Empty")
        return (null)
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch("/logIn", option)
        .then(res => res.json())
        .then(json => {
            if (json.exist && json.passCorr) {
                location.reload()
            } else {
                if (!json.exist) {
                    alert("User doesn't exist")
                } else {
                    alert("Password Incorrect")
                }
            }
        })
}

const signOut = () => {
    fetch("/signOut")
        .then(res => res.json())
        .then(json => json.signOut ? location.reload() : null)
}

const post = () => {
    const data = {
        comment: $("textarea").val(),
        date: new Date().toLocaleString().split(',')[0]
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/post', option)
}

const remove = (id, author) => {
    console.log(author)
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            author
        })
    };

    fetch("/remove", option)
        .then(res => res.json())
        .then(json => json.authority ? location.reload() : alert("You can't delete this comment as, you are not its author"))
}

function textAreaAdjust(element) {
    $(element).css("height", "1px");
    $(element).css("height", (25 + element.scrollHeight) + "px");
}