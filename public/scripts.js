async function getReq() {
    let p = fetch("http://localhost:3000/db").then((a) => a.json()).then((x) => console.log(x))
}

window.onload = function () {
    imagesToSwap = ['"picturesNfonts/1.jpg"', '"picturesNfonts/2.jpg"', '"picturesNfonts/seamless.jpg"', '"picturesNfonts/3.png"', '"picturesNfonts/4.jpg"', '"picturesNfonts/5.jpg"'];
    p = setInterval(() => {
        nr = Math.floor(Math.random() * 6);

        document.body.style.background = "url(" + imagesToSwap[nr] + ")";
        document.body.style.backgroundSize = "550px 500px";
        document.body.style.backgroundRepeat = "repeat";
        document.body.margin = '0';
        document.body.transition = '0.5s';
    }
        , 6000);
    document.getElementById("button1").addEventListener("click", () => {
        var txt = document.getElementsByClassName("paragrafheader")[0]
        if (txt.style.fontFamily == 'eotg')
            txt.style.fontFamily = 'Creme';
        else if (txt.style.fontFamily == 'Creme')
            txt.style.fontFamily = 'Classy';
        else
            txt.style.fontFamily = 'eotg';

    })
    window.onkeydown = function (event) {
        if (event.key == 's')
            clearInterval(p);
    }

    //POST pe event listener
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let val = document.getElementById("inputAdd").value;
        let objj = { id: '-1', img: val };
        const p = fetch("http://localhost:3000/db",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objj)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.reload();
            })
    })
    //DELETE la o imagine
    document.getElementById("buttonDelete").addEventListener("click", function () {
        let val = parseInt(document.getElementById("inputDelete").value);
        let objj = { id: val };
        const p = fetch("http://localhost:3000/db",
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objj)
            })
            //.then(response => response.json())
            .then(data => {
                window.location.reload();
            })
    })
    //GET pe gridul creat de tine
    function getImages() {
        const p = fetch("http://localhost:3000/db")
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data["photos"].length; i++) {
                    let picture = document.createElement("img");
                    picture.src = data["photos"][i].img;
                    picture.classList.add("yourOwnPhotos");
                    document.getElementById("gridByYou").appendChild(picture);
                }
            }
            )
    }
    //PUT 
    document.getElementById("buttonEdit").addEventListener("click", function () {
        let val1 = document.getElementById("inputEdit1").value;
        let val2 = document.getElementById("inputEdit2").value;
        let objj = { id: val1, img: val2 };
        const p = fetch("http://localhost:3000/db",
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objj)
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
    })
    getImages();
}
