document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.querySelector(".btn");
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');
  const table = document.querySelector(".students-table");

  const form = document.querySelector(".student-database");

  const errorsMap = {
    "form-fullname": 'Заполните ФИО студента',
    "form-birthdate": 'Когда студент родился?',
    "form-startdate": 'Когда начал учиться?',
    "form-faculty": 'На каком факультете?'
  };


  const checkInputs = (inputs) => {

    form.querySelectorAll("input").forEach((i) => {
      const invalidMessage = i.parentElement.querySelector(".invalid-feedback");

      if (invalidMessage) {
        invalidMessage.remove();
      }

      i.classList.remove("is-invalid");

      if (!i.value.trim().length) {
        const errorMessage = document.createElement("span");

        errorMessage.classList.add("invalid-feedback");
        errorMessage.textContent = errorsMap[i.id];
        i.parentElement.append(errorMessage);
        i.classList.add("is-invalid");
        return false;
      }
    })

    const checkBirthDate = new Date('01.01.1900');
    if ((inputs.birthday.valueAsDate < checkBirthDate) || (inputs.birthday.valueAsDate > today)) {
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("invalid-feedback");
      errorMessage.textContent = "Дата рождения должна быть между 1900 и нынешним годом";
      inputs.birthday.parentElement.append(errorMessage);

      inputs.birthday.classList.add("is-invalid");
    }

    if ((inputs.educationStart.value.trim().length) && (inputs.educationStart.value < 1910) || (inputs.educationStart.value > today.getFullYear())) {
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("invalid-feedback");
      errorMessage.textContent = "Год начала обучения должен быть между 1910 и нынешним годом";
      inputs.educationStart.parentElement.append(errorMessage);

      inputs.educationStart.classList.add("is-invalid");
    }

    if (form.querySelectorAll(".is-invalid").length) {
      return false;
    }

    return true;
  }

  const fullName = document.querySelector("#form-fullname");
  const facultyName = document.querySelector("#form-faculty");
  const birthday = document.querySelector("#form-birthdate");
  const educationStart = document.querySelector("#form-startdate");

  form.querySelectorAll("input").forEach((i) => {
    i.addEventListener("input", () => {
      checkInputs({ birthday: birthday, educationStart: educationStart });
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    let checkResult = checkInputs({ birthday: birthday, educationStart: educationStart });

    if (!checkResult) {
      return;
    }

    addStudentEntry(fullName, educationStart, birthday, facultyName);

    form.reset();
  })
});



let students = [
  { "firstName": "Петр", "lastName": "Петров", "fatherName": "Петрович", "educationStart": 2020, "birthDate": new Date("02.03.2000"), "facultyName": "Философия" },
  { "firstName": "Анна", "lastName": "Синицина", "fatherName": "Анновна", "educationStart": 2018, "birthDate": new Date("05.06.2001"), "facultyName": "Математика" },
  { "firstName": "Сергей", "lastName": "Сергеев", "fatherName": "Сергеевич", "educationStart": 2019, "birthDate": new Date("10.10.2000"), "facultyName": "Психология" },
];
const tableBody = document.querySelector(".students-table_body")
const today = new Date();
let yyyy = today.getFullYear();

function addStudentEntry(fullName, educationStart, birthday, facultyName) {
  console.log(students)
  let nameDetails = fullName.value.split(" ");
  console.log(nameDetails);
  birthYear = birthday.valueAsDate.getFullYear();
  let student = {};
  student.firstName = nameDetails[1];
  student.lastName = nameDetails[0];
  student.fatherName = nameDetails[2];
  student.educationStart = educationStart.valueAsNumber;
  student.birthDate = birthday.valueAsDate;
  student.facultyName = facultyName.value;

  students.push(student);

  populateTable([student]);

  return students;
};

populateTable(students);

function populateTable(students) {
  const studentsCopy = [...students];
  for (let student of studentsCopy) {
    tableBody.append(studentTR(student));
  }
};


function getBirthDateString(student) {
  let birthYear = student.birthDate.getFullYear();
  let birthMonth = (student.birthDate.getMonth() + 1);
  let birthDay = student.birthDate.getDate();

  if (birthDay < 10) {
    birthDay = '0' + birthDay
  } else {
    birthDay
  }

  if (birthMonth < 10) {
    birthMonth = '0' + birthMonth;
  } else {
    birthMonth
  }

  return birthDay + '.' + birthMonth + '.' + birthYear;
}

function getUniYear(student) {
  let uniYear = yyyy - student.educationStart;
  if (uniYear > 4) {
    return student.educationStart + "-" + (student.educationStart + 4) + " (закончил)";
  } else {
    return student.educationStart + "-" + (student.educationStart + 4) + " (" + uniYear + " курс)";
  }
}

function studentTR(student) {
  const row = document.createElement("TR");
  const tdName = document.createElement("TD");
  const tdBirthDate = document.createElement("TD");
  const tdStudyYears = document.createElement("TD");
  const tdFacultyName = document.createElement("TD");
  let birthYear = student.birthDate.getFullYear();
  let studentAge = yyyy - birthYear;

  tdName.textContent = student.lastName + " " + student.firstName + " " + student.fatherName;
  tdBirthDate.textContent = getBirthDateString(student) + " (" + studentAge + " лет)";
  tdStudyYears.textContent = getUniYear(student);
  tdFacultyName.textContent = student.facultyName;

  row.append(tdName);
  row.append(tdFacultyName);
  row.append(tdBirthDate);
  row.append(tdStudyYears);

  return row;
};


function filterTableIncludes(array, property, value) {
  let result = [];
  for (let elem of array) {
    if (elem[property].includes(value)) result.push(elem);
  }

  /* console.log(result) */
  return result;
};

function filterStartDate(array, property, value) {
  let result = [];

  for (let elem of array) {
    if (elem[property] === value) result.push(elem);
  }

  return result;
};

function filterEndDate(array, property, value) {
  let result = [];

  for (let elem of array) {
    if (elem[property] + 4 === value) result.push(elem);
  }

  return result;
};

function render(array) {
  let nameValue = document.querySelector(".filter-name").value;
  let facultyValue = document.querySelector(".filter-faculty").value;
  let startDateValue = document.querySelector(".filter-start").valueAsNumber;
  let endDateValue = document.querySelector(".filter-finish").valueAsNumber;

  if (nameValue !== "") array = filterTableIncludes(array, "firstName", nameValue);
  if (nameValue !== "") array = filterTableIncludes(array, "lastName", nameValue);
  if (nameValue !== "") array = filterTableIncludes(array, "fatherName", nameValue);

  if (facultyValue !== "") array = filterTableIncludes(array, "facultyName", facultyValue);

  if (!isNaN(startDateValue)) array = filterStartDate(array, "educationStart", startDateValue);

  if (!isNaN(endDateValue)) array = filterEndDate(array, "educationStart", endDateValue)


  tableBody.innerHTML = "";
  for (const student of array) {
    console.log("table with results: ", student);
    tableBody.append(studentTR(student));
  }
};

document.querySelectorAll(".filter-input").forEach(elem => {
  elem.addEventListener("input", event => {
    let students_ = students.map(student => { return { ...student } });
    /* console.log("students :", students) */
    event.preventDefault();
    render(students_);
  })
});


document.querySelector(".full-name-th").addEventListener("click", function() {
  let students_ = students.map(student => { return { ...student } });
  students_.sort((a, b) => a.lastName.localeCompare(b.lastName));

  tableBody.innerHTML = "";
  for (const student of students_) {
    tableBody.append(studentTR(student));
  }
});

document.querySelector(".faculty-th").addEventListener("click", function() {
  let students_ = students.map(student => { return { ...student } });
  students_.sort((a, b) => a.facultyName.localeCompare(b.facultyName));

  tableBody.innerHTML = "";
  for (const student of students_) {
    tableBody.append(studentTR(student));
  }
});

document.querySelector(".birthday-th").addEventListener("click", function() {
  let students_ = students.map(student => { return { ...student } });
  students_.sort((a, b) => a.birthDate - b.birthDate);

  tableBody.innerHTML = "";
  for (const student of students_) {
    tableBody.append(studentTR(student));
  }
});

document.querySelector(".study-years-th").addEventListener("click", function() {
  let students_ = students.map(student => { return { ...student } });
  students_.sort((a, b) => a.educationStart - b.educationStart);

  tableBody.innerHTML = "";
  for (const student of students_) {
    tableBody.append(studentTR(student));
  }
});
