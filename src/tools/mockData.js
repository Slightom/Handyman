const seniors = [
  { id: 1, firstName: "Jan", lastName: "Dzban", address: "Konopnickiej 14/5", phone: "555 444 333" },
  { id: 2, firstName: "Maria", lastName: "Wanna", address: "Wiejska 10/15", phone: "123 123 123" },
  { id: 3, firstName: "Irena", lastName: "Grzyb", address: "Polna 12", phone: "111 111 222" },
  { id: 4, firstName: "Janina", lastName: "Tłuszcz", address: "Tłusta 90/17", phone: "999 888 777" },
  { id: 5, firstName: "Halina", lastName: "Malina", address: "Porzeczkowa 3", phone: "121 121 122" },
  { id: 6, firstName: "Eugeniusz", lastName: "Konaszewski", address: "Olbrzymia 33/2", phone: "547 444 578" },
  { id: 7, firstName: "Nadzieja", lastName: "Ostatnia", address: "Waszyngtona 12/3", phone: "87 777 679" },
  { id: 8, firstName: "Luba", lastName: "Niemoja", address: "Konopnickiej 33/2", phone: "653 667 546" },
  { id: 9, firstName: "Maria", lastName: "Małysz", address: "Porzeczkowa 12/14", phone: "656 334 432" },
  { id: 10, firstName: "Genowefa", lastName: "Schumaer", address: "Cicha 4/9", phone: "777 334 432" },
  { id: 11, firstName: "Julia", lastName: "Roberts", address: "Wiejska 77/3", phone: "125 334 432" },
  { id: 12, firstName: "Janina", lastName: "Kac", address: "Kościelna 33/4", phone: "235 334 432" },
  { id: 13, firstName: "Marianna", lastName: "Wódka", address: "Hallera 12/9", phone: "374 334 432" },
  { id: 14, firstName: "Wiktoria", lastName: "Smalec", address: "Chrobrego 12/2", phone: "545 334 432" },
  { id: 15, firstName: "Teresa", lastName: "Bączek", address: "Mieszka I 1/4", phone: "555 334 432" },
  { id: 16, firstName: "Krystyna", lastName: "Czepialska", address: "Szkolna 6", phone: "213 334 432" },
  { id: 17, firstName: "Teresa", lastName: "Byk", address: "Dojnowska 50/4", phone: "123 334 432" },
  { id: 18, firstName: "Janusz", lastName: "Tracz", address: "Malinowa 88/3", phone: "245 334 432" },
  { id: 19, firstName: "Wiesława", lastName: "Koks", address: "Konwaliowa 32", phone: "434 334 432" },
  { id: 20, firstName: "Marianna", lastName: "Pudzianowska", address: "Wesoła 6/99", phone: "983 334 432" },
  { id: 21, firstName: "Martyna", lastName: "Wieloryb", address: "Gajowa 12/54", phone: "238 334 432" },
  { id: 22, firstName: "Ignacy", lastName: "Pacyfik", address: "Fabryczna 68/108", phone: "848 334 432" },
  { id: 23, firstName: "Mariola", lastName: "Kotlet", address: "Andrukiewicz 7/4", phone: "898 334 432" },
];

const newSenior = {
  id: null,
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
};

const formStatuses = [
  { id: 1, name: "Oczekujące" },
  { id: 2, name: "Wykonane" },
  { id: 3, name: "Rezygnacja" }
];

const handymans = [
  { id: 1, name: "Tomek Suchwałko" },
  { id: 2, name: "Paweł Kuć" }
];

const forms = [
  { id: 1, lp: 1, seniorId: 1, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 1, 1, 0, 0), repairDate: new Date(2021, 0, 2, 1, 0, 0), info: "wymiana baterii w kuchni" },
  { id: 2, lp: 2, seniorId: 2, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 1, 1, 0, 0), repairDate: new Date(2021, 0, 2, 1, 0, 0), info: "wymiana klamki, okno" },
  { id: 3, lp: 3, seniorId: 3, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 2, 1, 0, 0), repairDate: new Date(2021, 0, 3, 1, 0, 0), info: "regulacja okien" },
  { id: 4, lp: 4, seniorId: 4, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 2, 1, 0, 0), repairDate: new Date(2021, 0, 4, 1, 0, 0), info: "wymiana zamka" },
  { id: 5, lp: 5, seniorId: 4, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 2, 1, 0, 0), repairDate: new Date(2021, 0, 4, 1, 0, 0), info: "montaż rolety" },
  { id: 6, lp: 6, seniorId: 5, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 3, 1, 0, 0), repairDate: new Date(2021, 0, 4, 1, 0, 0), info: "kran przecieka" },
  { id: 7, lp: 8, seniorId: 6, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 4, 1, 0, 0), repairDate: new Date(2021, 0, 6, 1, 0, 0), info: "drzwi sie nie zamykają" },
  { id: 8, lp: 7, seniorId: 7, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 5, 1, 0, 0), repairDate: new Date(2021, 0, 7, 1, 0, 0), info: "wężayk od pralki" },
  { id: 9, lp: 9, seniorId: 8, handymanId: 2, formStatusId: 3, registrationDate: new Date(2021, 0, 6, 1, 0, 0), repairDate: new Date(2021, 0, 12, 1, 0, 0), info: "słuchawka prysznic" },
  { id: 10, lp: 11, seniorId: 9, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 7, 1, 0, 0), repairDate: new Date(2021, 0, 8, 1, 0, 0), info: "wymiana żarówki" },
  { id: 11, lp: 10, seniorId: 10, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 10, 1, 0, 0), repairDate: new Date(2021, 0, 12, 1, 0, 0), info: "płytka odpada w kuchni" },
  { id: 12, lp: 12, seniorId: 11, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 10, 1, 0, 0), repairDate: new Date(2021, 0, 15, 1, 0, 0), info: "kuchenka gazowa" },
  { id: 13, lp: 13, seniorId: 12, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 11, 1, 0, 0), repairDate: new Date(2021, 0, 15, 1, 0, 0), info: "wymiana umywalki" },
  { id: 14, lp: 14, seniorId: 13, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 12, 1, 0, 0), repairDate: new Date(2021, 0, 15, 1, 0, 0), info: "sedes się rusza" },
  { id: 15, lp: 15, seniorId: 14, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 12, 1, 0, 0), repairDate: new Date(2021, 0, 15, 1, 0, 0), info: "hakuna matata" },
  { id: 16, lp: 16, seniorId: 15, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 13, 1, 0, 0), repairDate: new Date(2021, 0, 16, 1, 0, 0), info: "nieszczelne okna" },
  { id: 17, lp: 17, seniorId: 16, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 15, 1, 0, 0), repairDate: new Date(2021, 0, 17, 1, 0, 0), info: "wymiana zamka w drzwiach" },
  { id: 18, lp: 18, seniorId: 1, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 0, 17, 1, 0, 0), repairDate: new Date(2021, 1, 3, 1, 0, 0), info: "naprawa krzesła" },
  { id: 19, lp: 19, seniorId: 2, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 0, 20, 1, 0, 0), repairDate: new Date(2021, 1, 4, 1, 0, 0), info: "montaż szafki" },
  { id: 20, lp: 20, seniorId: 4, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 0, 20, 1, 0, 0), repairDate: new Date(2021, 1, 4, 1, 0, 0), info: "zawieszenie obrazu" },
  { id: 21, lp: 21, seniorId: 5, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 0, 22, 1, 0, 0), repairDate: new Date(2021, 1, 6, 1, 0, 0), info: "przetkanie odpływu" },
  { id: 22, lp: 22, seniorId: 17, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 23, 1, 0, 0), repairDate: new Date(2021, 0, 24, 1, 0, 0), info: "naprawa kontaktu" },
  { id: 23, lp: 23, seniorId: 18, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 0, 24, 1, 0, 0), repairDate: new Date(2021, 0, 26, 1, 0, 0), info: "wymiana kontaktów" },
  { id: 24, lp: 24, seniorId: 19, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 0, 25, 1, 0, 0), repairDate: new Date(2021, 0, 27, 1, 0, 0), info: "wymiana baterii" },
  { id: 25, lp: 25, seniorId: 20, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 0, 27, 1, 0, 0), repairDate: new Date(2021, 0, 29, 1, 0, 0), info: "uszczelki w kranie" },
  { id: 26, lp: 26, seniorId: 21, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 0, 28, 1, 0, 0), repairDate: new Date(2021, 0, 30, 1, 0, 0), info: "uszelka pod głowicą" },
  { id: 27, lp: 27, seniorId: 22, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 0, 30, 1, 0, 0), repairDate: new Date(2021, 1, 2, 1, 0, 0), info: "klamka w oknie" },
  { id: 28, lp: 28, seniorId: 23, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 1, 1, 1, 0, 0), repairDate: new Date(2021, 1, 3, 1, 0, 0), info: "suszarka łazienkowa" },
  { id: 29, lp: 29, seniorId: 3, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 1, 2, 1, 0, 0), repairDate: new Date(2021, 1, 10, 1, 0, 0), info: "drzwiczki od baryku" },
  { id: 30, lp: 31, seniorId: 6, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 1, 2, 1, 0, 0), repairDate: new Date(2021, 1, 12, 1, 0, 0), info: "zlew" },
  { id: 31, lp: 30, seniorId: 8, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 1, 3, 1, 0, 0), repairDate: new Date(2021, 1, 15, 1, 0, 0), info: "sedes" },
  { id: 32, lp: 32, seniorId: 13, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 1, 4, 1, 0, 0), repairDate: new Date(2021, 1, 18, 1, 0, 0), info: "spłuczka cieknie woda" },
  { id: 33, lp: 33, seniorId: 11, handymanId: 2, formStatusId: 1, registrationDate: new Date(2021, 1, 4, 1, 0, 0), repairDate: new Date(2021, 1, 20, 1, 0, 0), info: "okno się nie otwiera" },
  { id: 34, lp: 34, seniorId: 12, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 1, 4, 1, 0, 0), repairDate: new Date(2021, 1, 25, 1, 0, 0), info: "cieknie woda w kranie" },
  { id: 35, lp: 35, seniorId: 10, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 1, 5, 1, 0, 0), repairDate: new Date(2021, 1, 27, 1, 0, 0), info: "wymiana syfonu" },
];

const newForm = {
  id: null,
  lp: null,
  seniorId: null,
  handymanId: null,
  formStatusId: null,
  registrationDate: null,
  repairDate: null,
  info: ""
}

const bills = [
  { id: 1, name: "LM hetmańska", amount: 89.32, date: new Date(2021, 0, 16, 1, 0, 0) },
  { id: 2, name: "vbh okna", amount: 62.50, date: new Date(2021, 0, 22, 1, 0, 0) },
  { id: 3, name: "benmar 42 pułku", amount: 549.19, date: new Date(2021, 0, 31, 1, 0, 0) }
];

const newBill = {
  id: null,
  name: "",
  amount: 0,
  date: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  seniors,
  formStatuses,
  handymans,
  forms,
  bills,

  newSenior,
  newForm,
  newBill
};