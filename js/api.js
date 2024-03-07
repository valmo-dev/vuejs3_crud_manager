const STUDENTDB = "StudentDB";

// localStorage est une 'db' local au navigateur et sert à stocker des objets JS

/**
 * Retourner la base de données locale
 */
const getLocalDB = () => {
    if (!localStorage.getItem(STUDENTDB)) {
        localStorage.setItem(STUDENTDB, JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(STUDENTDB));
};

/**
 * Mettre à jour la DB
 *
 * @param {string} db
 */
const updateDB = (db) => {
    localStorage.setItem(STUDENTDB, JSON.stringify(db));
};

/**
 * Ajouter un étudiant
 *
 * @param {int} student
 */
const addStudent = (student) => {
    const db = getLocalDB();

    student.id = Date.now() + "";
    db.push(student);

    updateDB(db);
};

/**
 * Mettre à jour l'étudiant
 *
 * @param {obj} student
 */
const updateStudent = (student) => {
    const db = getLocalDB();

    const updatedDb = db.map(function (currentStudent) {
        if (currentStudent.id === student.id) {
            return {
                name: student.name,
                firstname: student.firstname,
                birthdate: student.birthdate,
                scholarLevel: student.scholarLevel,
                id: student.id,
            };
        }

        return currentStudent;
    });

    updateDB(updatedDb);
};

/**
 * Supprimer un étudiant
 *
 * @param {obj} student
 */
const deleteStudent = (student) => {
    const db = getLocalDB();

    const updatedDb = db.filter(function (currentStudent) {
        return currentStudent.id !== student.id;
    });

    updateDB(updatedDb);
};

/**
 * Récupérer un étudiant par son ID
 *
 * @param {int} id
 * @@returns
 */
const getStudent = (id) => {
    const db = getLocalDB();

    const filteredDB = db.filter((data) => data.id === id);
    if (filteredDB.length > 0) {
        return filteredDB[0];
    }

    return null;
};

/**
 * Rechercher un étudiant
 *
 * @param {string} name
 * @returns
 */
const searchStudentByName = (name) => {
    const db = getLocalDB();

    const filteredDB = db.filter((data) => {
        return (
            data.name.toLowerCase().includes(name.toLowerCase()) ||
            data.firstname.toLowerCase().includes(name.toLowerCase())
        );
    });

    return filteredDB;
};

/**
 * Vérifier si un étudiant existe
 *
 * @param {string} name
 * @param {string} firstname
 * @returns
 */
const checkIfStudentExist = (name, firstname) => {
    const db = getLocalDB();

    const filteredDB = db.filter((data) => {
        return (
            data.name.toLowerCase() === name.toLowerCase() &&
            data.firstname.toLowerCase() === firstname.toLowerCase()
        );
    });

    return filteredDB.lenght > 0;
};
