
// let details = [];

// let detailsString = JSON.stringify(details);

// localStorage.setItem("details",detailsString);

let details = localStorage.getItem("details");

if(details === null)
{
    let details = [];

    let detailsString = JSON.stringify(details);

    localStorage.setItem("details",detailsString);
}



const display = () => {

    const footer = document.getElementById("footer-content");

    footer.textContent = "";

    const table = document.createElement("table");
    //const table = document.getElementById("tableElement");
    table.textContent = "";

    const tr = document.createElement("tr");

    th1 = document.createElement("th");
    th1.textContent = "Name";
    tr.appendChild(th1);

    th2 = document.createElement("th");
    th2.textContent = "Email";
    tr.appendChild(th2);

    th3 = document.createElement("th");
    th3.textContent = "Password";
    tr.appendChild(th3);

    th4 = document.createElement("th");
    th4.textContent = "Dob";
    tr.appendChild(th4);

    th5 = document.createElement("th");
    th5.textContent = "Accepted terms?";
    tr.appendChild(th5);


    table.appendChild(tr);

    footer.appendChild(table);

    let myDetails = localStorage.getItem("details");
    let detailsArray = JSON.parse(myDetails);

    for(let item of detailsArray)
    {

        const {name,email,password,dob,accepted} = item;

       // let table = document.getElementById("tableElement");

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.textContent = name;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = email;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.textContent = password;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.textContent = dob;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.textContent = accepted;
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}

display();

const validate = () => {
    
    let table = document.getElementById("tableElement");

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let accept = document.getElementById("checkbox");
    let accepted = false;

    if(accept.checked)
        accepted = true;
    else
        accepted = false;


    let details = {
        name,
        email,
        password,
        dob ,
        accepted
    };

    let myDetails = localStorage.getItem("details");
    let detailsArray = JSON.parse(myDetails);

    detailsArray.push(details);

    //details = [];

    let detailsString = JSON.stringify(detailsArray);

    localStorage.setItem("details",detailsString);


    display();


}