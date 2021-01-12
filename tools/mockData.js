const seniors = [
  { id: 1, firstName: "Jan", lastName: "Dzban", address: "Konopnickiej 14/5", phone: "555 444 333", shortcut: "Dzban Jan, Konopnickiej 14/5" },
  { id: 2, firstName: "Maria", lastName: "Wanna", address: "Wiejska 10/15", phone: "123 123 123", shortcut: "Wanna Maria, Wiejska 10/15" },
  { id: 3, firstName: "Irena", lastName: "Grzyb", address: "Polna 12", phone: "111 111 222", shortcut: "Grzyb Irena, Polna 12" },
  { id: 4, firstName: "Janina", lastName: "Tłuszcz", address: "Tłusta 90/17", phone: "999 888 777", shortcut: "Tłuszcz Janina, Tłusta 90/17" },
  { id: 5, firstName: "Halina", lastName: "Malina", address: "Porzeczkowa 3", phone: "121 121 122", shortcut: "Malina Halina, Porzeczkowa 3" }
];

const newSenior = {
  id: null,
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  shortcut: ""
};

const formStatuses = [
  { id: 1, name: "Oczekujące" },
  { id: 2, name: "Wykonane" },
  { id: 3, name: "Rezygnacja" }
];

const handymans = [
  { id: 1, name: "Tomek" },
  { id: 2, name: "Paweł" }
];

const forms = [
  { id: 1, lp: 1, seniorId: 1, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 1, 1, 1, 0, 0), repairDate: new Date(2021, 1, 1, 1, 0, 0), info: "wymiana baterii w kuchni" },
  { id: 2, lp: 2, seniorId: 2, handymanId: 1, formStatusId: 1, registrationDate: new Date(2021, 1, 1, 1, 0, 0), repairDate: new Date(2021, 1, 1, 1, 0, 0), info: "wymiana klamki, okno" },
  { id: 3, lp: 3, seniorId: 3, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 1, 2, 1, 0, 0), repairDate: new Date(2021, 1, 3, 1, 0, 0), info: "regulacja okien" },
  { id: 4, lp: 4, seniorId: 4, handymanId: 2, formStatusId: 2, registrationDate: new Date(2021, 1, 2, 1, 0, 0), repairDate: new Date(2021, 1, 3, 1, 0, 0), info: "wymiana zamka" },
  { id: 5, lp: 5, seniorId: 4, handymanId: 1, formStatusId: 2, registrationDate: new Date(2021, 1, 2, 1, 0, 0), repairDate: new Date(2021, 2, 4, 1, 0, 0), info: "montaż rolety" },
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

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  seniors,
  formStatuses,
  handymans,
  forms,

  newSenior,
  newForm
};