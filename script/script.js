const h1 = document.querySelector("h1"),
    pre_quest = document.querySelector(".pre-quest"),
    submit = document.querySelector(".submit"),
    currentSpan = document.querySelector(".current"),
    labels = document.querySelectorAll("label"),
    radios = document.querySelectorAll("input[type='radio']"),
    demandeSpan = document.querySelector(".demande-answer");


demandeSpan.style.display = "none";

function reChangeColor() {
    currentSpan.style.color = "black";
}

function reloading(value) {
    switch (value) {
        case 1:
            location.reload();
            break;
        case 2:
            window.open("https://github.com/ELHart05", "_self");
            break;
    }
}

async function JSONRetrive() {

    const Res = await fetch("../quests.json");
    const Data = await Res.json();


    let currentValue = '',
        Cpt = 0,
        winningCounter = 0;

    function nextQuest() {
        labels.forEach(label => label.style.color = "black");
        reChangeColor();
        radios.forEach(radio => radio.checked = false);
        Cpt++;
        Init(Cpt);
        currentValue = '';
    }


    function Init(val) {
        h1.textContent = `Quest ${val+1}`;
        pre_quest.textContent = Data[val].question;
        for (let i = 0; i < 4; i++) {
            labels[i].textContent = Data[val].answers[i];
            radios[i].value = Data[val].answers[i]
        }
    }
    Init(0);

    radios.forEach(radio => radio.addEventListener("click", function () {
        currentValue = radio.value;
    }))

    submit.addEventListener("click", function () {
        if (!currentValue) {
            demandeSpan.style.display = "flex";
            return;
        }
        if (currentValue == Data[Cpt].Answer) {
            demandeSpan.style.display = "none";
            currentSpan.textContent = `${winningCounter+1}/8`;
            currentSpan.style.color = "green";
            winningCounter++;
            if (winningCounter == Data.length) {
                submit.textContent = "Congratulations You Did It.";
                submit.setAttribute("disabled", "true");
                labels.forEach(label => {
                    (label.textContent == Data[Cpt].Answer) ? label.style.color = "green": label;
                })
                setTimeout(reloading, 2000, 2);
                return;
            }
        } else {
            currentSpan.style.color = "red";
            demandeSpan.style.display = "none";
        }
        if ((winningCounter != Data.length) && (Cpt == Data.length - 1)) {
            currentSpan.style.color = "red";
            submit.textContent = "You Have Failed, Try Again.";
            submit.setAttribute("disabled", "true");
            labels.forEach(label => {
                (label.textContent == currentValue) ? label.style.color = "red": label;
            })
            setTimeout(reloading, 2000, 1);
            return;
        }
        labels.forEach(label => {
            if (currentValue == Data[Cpt].Answer) {
                (label.textContent == Data[Cpt].Answer) ? label.style.color = "green": label;
            } else {
                (label.textContent == currentValue) ? label.style.color = "red": label;
            }
        })
        setTimeout(nextQuest, 1000);
    })

}
JSONRetrive();