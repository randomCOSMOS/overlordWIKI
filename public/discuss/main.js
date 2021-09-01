fetch('/loggedIn')
    .then(res => res.json())
    .then(json => {
        content1 = `<a onclick="signOut()" href="javascript:void(0)"><li>Sign Out</li></a>`
        if (json.loggedIn) {
            $("nav ul").append(content1)
            $(".comment").css("display", "block")
        } else {
            $(".sign").css("display", "flex")
        }
    })

fetch("/comments")
    .then(res => res.json())
    .then(json => {
        for (i = 0; i < json.length; i++) {
            $("form").after(`<div class="test">Comment: ${json[i].comment} Name: ${json[i].name}</div>`)
        }
    })

const signIn = async () => {
    const credential = {
        username: $("#username").val(),
        password: $("#password").val(),
        loggedIn: "true"
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credential)
    };

    fetch("/signIn", option)
        .then(res => res.json())
        .then(json => json.duplicate ? alert("Username Already exists") : location.reload())
}

const logIn = () => {
    const credential = {
        username: $("#username").val(),
        password: $("#password").val(),
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credential)
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
            console.log(json)
        })
}

const signOut = () => {
    fetch("/signOut");
    location.reload();
}

$(".submit").on('click', () => {
    let comment = $('#comm').val()
    let name = $('#name').val()
    const stuff = {
        comment,
        name
    }

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(stuff)
    };

    fetch("/submit", option)
        .then(res => res.json())
        .then(json => console.info(json.response));
})

function textAreaAdjust(element) {
    $(element).css("height", "1px");
    $(element).css("height", (25 + element.scrollHeight) + "px");
}