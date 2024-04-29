let tbody = document.querySelector(".tbody")

let api = "https://6603d32e2393662c31cfca36.mockapi.io/api/nf/to-do-modul"



/// GET

async function get() {
   try {
    let response = await fetch(api)
    let data = await response.json()
    getData(data)
   } catch (error) {
    console.error(error);
   }
   
}
get()




//// ADD
let diaAdd = document.querySelector(".diaAdd")
let btnAdd = document.querySelector(".btnAdd")
let formAd = document.querySelector(".formAd")
let btnClose = document.querySelector(".btnClose")

btnClose.onclick = () => {
diaAdd.close()
}
btnAdd.onclick = () => {
diaAdd.showModal()
}


async function PostUser(user){
    try {
        const response = await fetch(api , {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.error(error);
    }

}

formAd.onsubmit = (event) => {
    event.preventDefault()
    
    let newUser = {
        name : formAd['Costomer'].value,
        date : formAd['date'].value,
        payment : formAd['selforAd'].value,
        total : formAd['total'].value,
        status : formAd['selstatAd'].value =="paid" ? true : false,
    }

    PostUser(newUser)
    diaAdd.close()
    formAd.reset()
   

}



let diainfo = document.querySelector(".diainfo")
let nameInfo = document.querySelector(".nameInfo")
let datein = document.querySelector(".datein")
let payIn = document.querySelector(".payIn")
let totalIn = document.querySelector(".totalIn")
let Status = document.querySelector(".Status")

let closein = document.querySelector(".btnCloseIn")

closein.onclick = () => {
    diainfo.close()

}

function getData(data) {
    tbody.innerHTML = "";
    data.forEach(elem => {
        let tr = document.createElement("tr");

        let tId = document.createElement("td");
        tId.innerHTML = elem.id;

        let Tname = document.createElement("td");
        Tname.innerHTML = elem.name;

        let Tdate = document.createElement("td");
        Tdate.innerHTML = elem.date;

        let Tpayment = document.createElement("td");
        Tpayment.innerHTML = elem.payment;

        let Ttotal = document.createElement("td");
        Ttotal.innerHTML = elem.tatal; 

        let Tstatus = document.createElement("td");
        Tstatus.innerHTML = elem.status ? "Paid" : "Unpaid";
        Tstatus.style.backgroundColor = elem.status ? "#188754" : "#D8354D";

        let tButtons = document.createElement("td");

        let btnInfo = document.createElement("button");
        
       let imgInfo = document.createElement("img");
        imgInfo.src = "/img/icons8-info-48.png";
        btnInfo.append(imgInfo);
        btnInfo.style.backgroundColor = "transparent";
        btnInfo.style.border = "1px solid #188754";
       
        btnInfo.style.borderRadius = "50%";
        


        btnInfo.onclick = () => {
            diainfo.showModal()
            nameInfo.innerHTML = elem.name;
            datein.innerHTML = elem.date;
            payIn.innerHTML = elem.payment;
            totalIn.innerHTML = elem.tatal;
            Status.innerHTML = elem.status ? "Paid" : "Unpaid";
            Status.style.backgroundColor = elem.status ? "#188754" : "#D8354D";
          

        }

        let btnEdit = document.createElement("button");
        let imgEdit = document.createElement("img");
        imgEdit.src = "/img/icons8-edit-50.png";
        btnEdit.append(imgEdit);
        btnEdit.style.backgroundColor = "#188754";
        btnEdit.style.border = "1px solid #188754";
        btnEdit.style.borderRadius = "50%";



        btnEdit.onclick = () => {
            showModal(elem);
        };

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = elem.status;

        if (elem.status) {
            Tname.style.textDecoration = "line-through";
            Tname.style.color = "red";
        }

        checkbox.onclick = () => {
            elem.status = !elem.status
            editUser(elem.id,elem)
        }

        let btnDelete = document.createElement("button");
        let imgDel = document.createElement("img");
        imgDel.src = "/img/icons8-delete-50.png";
        btnDelete.append(imgDel);
        btnDelete.style.backgroundColor = "#D8354D";
        btnDelete.style.border = "1px solid #D8354D";
        btnDelete.style.borderRadius = "50%";

        btnDelete.style.borderRadius = "50%";

        btnDelete.onclick = () => {
            deleteUser(elem.id);
        };

        tButtons.append(btnInfo, btnEdit, btnDelete ,checkbox);

        tr.append(tId, Tname, Tdate, Tpayment, Ttotal, Tstatus, tButtons);
        tbody.appendChild(tr);
    });
}


/// All for Edit
let editModal = document.querySelector(".editModal")
let formEdit = document.querySelector(".formEdit")
let btnCloseE = document.querySelector(".btnCloseE")

btnCloseE.onclick = () => {
editModal.close()
}

function showModal(e) {
    editModal.showModal()

    formEdit['Costomer'].value = e.name;
    formEdit['date'].value = e.date;
    formEdit['total'].value = e.tatal;
    formEdit['selfor'].value = e.payment == "cash" ? "cash" : e.payment === "card" ? "card" : "checku";
    formEdit['selstatE'].value = e.status ? "paid" : "unpaid";
    
    formEdit.onsubmit = (event) => {
        event.preventDefault()
        let newUser = {
            ...e,
            name : formEdit['Costomer'].value,
            date : formEdit['date'].value,
            payment : formEdit['selfor'].value,
            tatal : formEdit['total'].value,
            status : formEdit['selstatE'].value =="paid" ? true : false,
        }
        PutUser(e.id,newUser)
        editModal.close()
       
    }

}

async function PutUser (id,user) {
    try {
       const response = await fetch(`${api}/${id}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
       }) 
       get()
    } catch (error) {
        console.error(error);
    }
}
async function editUser(id) {
    try {
        const response = await fetch(`${api}/${id}`);
     
     const user = await response.json();
     
     user.status = !user.status;

        await PutUser(id, user);

        get();
    } catch (error) {
        console.error(error);
    }
 }




//// delete 

async function deleteUser(id) {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: "DELETE",
        });
        get();
    } catch (error) {
        console.error(error);
    }
}


///// search 

let search = document.querySelector(".search");

search.oninput = async () => {
    let value = search.value.toUpperCase().trim();
    try {
        const response = await fetch(api);
        const data = await response.json();

        let newUser = data.filter((el) => {
            return el.name.toUpperCase().trim().includes(value);
        });

        getData(newUser);
    } catch (error) {
        console.error(error);
    }
};



   let select = document.querySelector("#select")

   select.onchange = async () => {
    let url = api
    if(select.value !== "all"){
        url += `?status=${select.value == "online" ? true : false}`
    }
    try {
        let response = await fetch(url)
        const data = await response.json()
        getData(data)
    } catch (error) {
        console.error(error);
    }


}
