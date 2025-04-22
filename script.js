
function validationForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;

    if (!name) {
        alert("Name is required!");  
        return false;
    }
    if (!age) {
        alert("age is required!");
        return false;
    }

    if (!email) {
        alert("email is required!");
        return false;
    }

    if (!number) {
        alert("number is required!");
        return false;
    }

    return true;

}

function showData(searchData) {
    var userList;



    if (searchData) {

        console.log("search data is here ");
        console.log(searchData)
          userList = [searchData]



    } else {
        console.log("search data is no");


        console.log(document.getElementById('crudtable'));
        if (localStorage.getItem('userList') == null) {
            userList = [];
        } else {
            userList = JSON.parse(localStorage.getItem('userList'));
        }

    }

 

    console.log(userList);

    let html = "";
    let sno = 1;

    userList.forEach((element,index) => {
        html += "<tr>";
        html += "<td>" + sno + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.number + "</td>";
        html += `<td style="display:flex;width:25px">
                  <button class="btndelete" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i> </button>
                  <button class="btnedit" onclick="updateData(${index})"><i class="fa-solid fa-pen-to-square"></i> </button>
                 </td>`;
        html += "</tr>";
        sno++;
    });

    const table = document.getElementById('crudtable');

    if (table) {
        table.querySelector('tbody').innerHTML = html;
    } else {
        console.error("Table with ID 'crudtable' not found.");
    }


}

document.addEventListener('DOMContentLoaded', function () {
    showData();
});



function AddData() {
    if (validationForm() == true) {

        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var email = document.getElementById("email").value;
        var number = document.getElementById("number").value;

        var userList;
        if (localStorage.getItem('userList') == null) {
            userList = [];
        } else {
            userList = JSON.parse(localStorage.getItem('userList'));
        }
        userList.push({
            name: name,
            age: age,
            email: email,
            number: number,
        });

        localStorage.setItem('userList', JSON.stringify(userList))
        showData();

    }

}

function deleteData(index) {
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }
    userList.splice(index, 1);
    localStorage.setItem('userList', JSON.stringify(userList))
    showData();

}
function updateData(index) {
    document.getElementById("submit").style.display = 'none';
    document.getElementById("update").style.display = 'block';

    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }


    document.getElementById("name").value = userList[index].name;
    document.getElementById("age").value = userList[index].age;
    document.getElementById("email").value = userList[index].email;
    document.getElementById("number").value = userList[index].number;



    document.querySelector("#update").onclick = function () {
        userList[index].name = document.getElementById("name").value;
        userList[index].age = document.getElementById("age").value;
        userList[index].email = document.getElementById("email").value;
        userList[index].number = document.getElementById("number").value;



        localStorage.setItem('userList',JSON.stringify(userList));
        showData();

        document.getElementById("submit").style.display = 'none';
        document.getElementById("update").style.display = 'block';
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("email").value = "";
        document.getElementById("number").value = "";
    }

    console.log(userList);

}

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener('click', () => {
    const searchBox = document.getElementById("searchBox").value;  
    console.log(searchBox);

    const userList = JSON.parse(localStorage.getItem('userList')) || []
    console.log(userList);


    const user = userList.find((user) => user.name == searchBox);

    console.log(user);
    showData(user)
           
});  

    