const patients = [];
  const addPatients = patient => {
    const data = patient.split(";");
    if (data.length === 8) {
      const name = data[0];
      const surname = data[1];
      const gender = data[2];
      const region = data[3];
      const year = data[4];
      const email = data[5];
      const phone = data[6];
      const sick = data[7];
      patients.push({ name, surname, gender, region, year, email, phone, sick })
    }
  };

  
  fetch("./patientData/patientendata.csv")
    .then(response => response.text())
    .then((data) => {
      const patientsData = data.split("\n");
      patientsData.forEach((patient) => addPatients(patient))
    })
console.log(patients);
    

const dentists =
    [
        {
            name: "Anne",
            surname: "Snijder",
            email: "anne.snijder@tandartspraktijkbvt.nl",
            phone: "0205209002",
            specialistme: 2,
            sick: false
        },
        {
            name: "Duncan",
            surname: "Goos",
            email: "duncan.goos@tandartspraktijkbvt.nl",
            phone: "0205209001",
            specialistme: 1,
            sick: false
        },
        {
            name: "Joost",
            surname: "Boonstra",
            email: "joost.boonstra@tandartspraktijkbvt.nl",
            phone: "0205209004",
            specialistme: 2,
            sick: false
        },
        {
            name: "Sabine",
            surname: "Koning",
            email: "sabine.koning@tandartspraktijkbvt.nl",
            phone: "0205209005",
            specialistme: 1,
            sick: false
        }
    ];

const assistants =
    [
        {
            name: "Josje",
            surname: "Bos",
            email: "josje.bos@tandartspraktijkbvt.nl",
            phone: "0205209003",
            sick: false
        },
        {
            name: "Andre",
            surname: "Witteman",
            email: "andre.witteman@tandartspraktijkbvt.nl",
            phone: "0205209006",
            sick: false
        }
  ];


const getRandomInteger = (from, to) => from + Math.floor(Math.random() * to);

const generateNItems = (num, func) => Array(num).fill(0).map(func);

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const getRandomTime = () => getRandomInteger(8, 19);

const getRandomDay = () => getRandomInteger(1, 28);

const getRandomId = () => getRandomInteger(1, 10000)

const getRandomDentist = () => getRandomItem(dentists);
const getRandomAssistant = () => getRandomItem(assistants);
const getRandomPatient = () => getRandomItem(patients);


 
  const generateRandomAppointment = () => {
    const appointment = {
      id: getRandomId(),
      patient: getRandomPatient(),
      dentist: getRandomDentist(),
      day: getRandomDay(),
      time: getRandomTime(),
      
    };

    if (getRandomInteger(0, 2) === 1)
      appointment.assistant = getRandomAssistant();
    return appointment
    
  }
  const newappointments = (people, num_appointments) =>
    generateNItems(num_appointments, () => generateRandomAppointment(people));

  const getInitialState = () => {
    const Number_Dentists = 4;
    const Number_Assistants = 2;
    const Number_Patients = 50;
    const Number_Appointments = 10;
    const people = {
      dentists: generateNItems(Number_Dentists, getRandomDentist),
      patients: generateNItems(Number_Patients, getRandomPatient),
      assistants: generateNItems(Number_Assistants, getRandomAssistant),
    }
    const appointments = newappointments(people, Number_Appointments);
    return { ...people, ...{ appointments } };
  }
  const appointments = getInitialState();

  console.log(appointments);
    
export { dentists, assistants, appointments, patients}