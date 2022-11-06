const main = document.querySelector("main");
const btns = document.querySelectorAll("button");
const input = document.querySelector("input");

function image_gender(image, gender) {
  if (image === "" && gender === "male") {
    return "https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg";
  } else if (image === "" && gender === "female") {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgpqgkwZ-iHYLyhsk-Kk8G2TlnxlVcaIT5Q&usqp=CAU";
  } else {
    return image;
  }
}

let data;
const foo = (data) => {
  main.innerHTML = "";
  data.forEach((el) => {
    const card = document.createElement("div");
    main.append(card);
    banner(card, el.house);
    card.innerHTML += `<div class="card">
  <div class='card_img'><img src=${image_gender(el.image, el.gender)}
      width='200px' height='200px'><div>
     <p class="name">${el.name} </p>
	<p>${el.gender}</p>
  <p>${el.house}</p>
	<p>${el.species}</p>
  <p>${el.dateOfBirth}</p>
  <img src='${banner(el.house)}' alt='${el.house}' class='banner'></div>`;
    filterColor(card, el.house);
  });
};

const fetchData = async () => {
  const response = await fetch("https://hp-api.herokuapp.com/api/characters");
  const json = await response.json();
  data = await json;
  foo(data);
};

input.addEventListener("change", (e) => {
  const filteredData = data.filter((account) =>
    account.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  foo(filteredData);
});

const filteringDataByFaculties = (data, house) => {
  const filteredData = data.filter((account) =>
    account.house.toLocaleLowerCase().includes(house.toLocaleLowerCase())
  );
  foo(filteredData);
};

btns[0].addEventListener("click", () => {
  foo(data);
});
btns[1].addEventListener("click", () => {
  filteringDataByFaculties(data, "Gryffindor");
});
btns[2].addEventListener("click", () => {
  filteringDataByFaculties(data, "Slytherin");
});
btns[3].addEventListener("click", () => {
  filteringDataByFaculties(data, "Hufflepuff");
});
btns[4].addEventListener("click", () => {
  filteringDataByFaculties(data, "Ravenclaw");
});

function filterColor(card, house,) {
  if (house === "Gryffindor") {
    card.style.backgroundColor = "red" ;
  } else if (house === "Slytherin") {
    card.style.backgroundColor = "green";
  } else if (house === "Hufflepuff") {
    card.style.backgroundColor = "yellow";
  } else if (house === "Ravenclaw") {
    card.style.backgroundColor = "blue";
  } else {
    card.style.backgroundColor = "gray";
  }
}

function banner(house) {
  switch (house) {
    case "Gryffindor":
      return  'banners/griffindor.png'
    case "Slytherin":
      return 'banners/Slytherin.png'
    case "Hufflepuff":
      return "banners/Hufflepuf.png";
    case "Ravenclaw":
      return "banners/Ravenclaw.png";
    default:
      return "banners/all.png"
  }
}




fetchData();
