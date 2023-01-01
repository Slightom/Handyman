export const FORM_FINISHED = "Wykonane";
export const FORM_WAITING = "Oczekujące";
export const FORM_REJECTED = "Rezygnacja";

export const SESSION_TIME = 60 * 15; // in seconds

export const Labels = {
    Forms: "Formularze",
    Seniors: "Seniorzy",
    Bills: "Faktury",
    Summary: "Podsumowanie",

    Lp: "Lp",
    Senior: "Senior",
    Address: "Adres",
    Phone: "Telefon",
    Status: "Status",
    Handyman: "Złota Rączka",
    Registration: "Data zgłoszenia",
    Repair: "Data naprawy",
    Info: "Informacje",

    AddForm: "Dodaj Formularz",
    AddSenior: "Dodaj Seniora",
    AddBill: "Dodaj Fakturę",
    Search: "Szukaj",

    FirstName: "Imię",
    LastName: "Nazwisko",
    Finished: "Wykonane",
    Waiting: "Oczekujące",
    Rejected: "Rezygnacja",

    Name: "Nazwa",
    Amount: "Kwota",
    Date: "Data",

    Period: "Okres",
    AvgAmount: "Średnia kwota/naprawę",

    AddSeniorH: "Dodawanie Seniora",
    AddFormH: "Dodawanie Formularza",
    AddBillH: "Dodawanie Faktury",
    EditSeniorH: "Edytowanie Seniora",
    EditFormH: "Edytowanie Formularza",
    EditBillH: "Edytowanie Faktury",

    Save: "Zapisz",
    Saving: "Zapisuję..",
    Log: "Zaloguj",
    Logging: "Logowanie..",
    Cancel: "Anuluj",
    Yes: "Tak",
    No: "Nie",
    ConfirmationTitle: "Potwierdzenie usunięcia",
    ConfirmationMsg: "Jesteś pewien, że chcesz to zrobić?",
    ConfirmationMsgSenior: "Jesteś pewien, że chcesz to zrobić? Jeśli usuniesz Seniora, wszystkie jego formularze również zostaną usuniete.",
    All: "Wszystkie",
    Show: "Pokaż",
    Entries: "rekordów",
    User: "Użytkownik",
    Logout: "Wyloguj",
    SelectSenior: "-",
    SelectStatus: "-",
    SelectHandyman: "-",
    Loading: "Loading...",

    ErrorFirstNameRequired: "Imię jest wymagane",
    ErrorLastNameRequired: "Nazwisko jest wymagane",
    ErrorAddressRequired: "Adres jest wymagany",
    ErrorPhoneRequired: "Telefon jest wymagany",
    ErrorPhoneFormtNotValid: "Pole nr telefonu musi składać się wyłącznie z 9 cyfr",
    ErrorSeniorRequired: "Senior jest wymagany",
    ErrorSenior5FormsAlready: "Dla tego seniora przypisano już 5 formularzy",
    ErrorHandymanRequired: "Złota Rączka jest wymagana",
    ErrorFormStatusRequired: "Status formularza jest wymagany",
    ErrorLpRequired: "Lp jest wymagane",
    ErrorLpMustBeNumber: "Lp musi być liczbą",
    ErrorLpDuplicate: "Formularz z tym numerem Lp już istnieje",
    ErrorRepairBeforeRegistration: "Data Naprawy nie może być wcześniejsza niż data rejestracji",
    ErrorRepairLess30days: "Nie minęło 30 dni od ostatniej naprawy",
    ErrorRepairLess30daysNext: "Następna naprawa z datą <= 30 dni",
    ErrorAmountRequired: "Kwota jest wymagana",
    ErrorAmountMustBeNumber: "kwota musi być liczbą",
    ErorNameRequired: "Nazwa jest wymagana",
    ErrorInfoRequired: "Informacja o naprawie jest wymagana",
    ErrorDateRequired: "Data jest wymagana",
    ErrorRepairDateRequired: "Data naprawy jest wymagana",
    ErrorRegistDateRequired: "Data zgłoszenia jest wymagana",

    FormSaved: "Formularz zapisany",
    SeniorSaved: "Senior zapisany",
    BillSaved: 'Faktura zapisana',
    FormDeleted: "Formularz usunięty",
    SeniorDeleted: "Senior usunięty",
    BillDeleted: 'Faktura usunięta',

    LoadingFormsFailed: "Nieudane ładowanie formularzy",
    LoadingSeniorsFailed: "Nieudane ładowanie seniorów",
    LoadingHandymansFailed: "Nieudane ładowanie Złotych",
    LoadingFormStatusesFailed: "Nieudane ładowanie statusów",
    LoadingBillsFailed: "Nieudane ładowanie faktur",

    DeleteFailed: "Nieudane Usuwanie",

    Username: "Użytkownik",
    Password: "Hasło",
    ErrorUsernameRequired: "Nazwa użytkownika jest wymagana",
    ErrorPasswordRequired: "Hasło jest wymagane",
    ErrorDbConnection: "Nie można połączyć się z bazą danych. Spróbuj ponownie później",

    PeriodAll: 'Całość',

    SeniorHistoryForms: "Historia formularzy seniora",
    SeniorDoesntHaveForms: "Nie ma formularzy powiązanych z tym seniorem"
}