const checkIfEmptyValue = (obj) => {
    let isEmpty = false;
    for (const prop in obj) {
        if (obj[prop] === "") {
            isEmpty = true;
        }
    }

    return isEmpty;
};

showSuccessMessage = (title, message) => {
    Swal.fire({
        showCancelButton: false,
        buttonsStyling: false,
        icon: "success",
        title: title,
        text: message,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: {
            popup: "!relative !transform !overflow-hidden !rounded-sm !bg-white !text-left !shadow-xl !transition-all sm:!my-8 sm:!w-full sm:!max-w-lg !p-0 !grid-cols-none",
            title: "!p-4 !pt-3 !text-center sm:!text-left !text-3xl !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
            htmlContainer:
                "!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-md !text-gray-900 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
            actions:
                "!px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3",
            confirmButton:
                "inline-flex w-full h-14 justify-center rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto",
            cancelButton:
                "mt-3 inline-flex w-full h-14 justify-center rounded-sm bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto",
        },
    });
};

showErrorMessage = (title, message) => {
    Swal.fire({
        showCancelButton: false,
        buttonsStyling: false,
        icon: "error",
        title: title,
        text: message,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: {
            popup: "!relative !transform !overflow-hidden !rounded-sm !bg-white !text-left !shadow-xl !transition-all sm:!my-8 sm:!w-full sm:!max-w-lg !p-0 !grid-cols-none",
            title: "!p-4 !pt-3 !text-center sm:!text-left !text-3xl !font-semibold !leading-6 !text-gray-900 !pl-4 !pr-4 sm:!pr-6 sm:!pl-0 sm:!pt-6 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
            htmlContainer:
                "!mt-2 sm:!mt-0 !m-0 !text-center sm:!text-left !text-md !text-gray-900 !pl-4 sm:!pl-0 !pr-4 !pb-4 sm:!pr-6 sm:!pb-4 sm:!ml-4 !col-start-1 sm:!col-start-2 !col-end-3",
            actions:
                "!px-4 !py-3 sm:!flex sm:!flex-row-reverse sm:!px-6 !w-full !justify-start !mt-0 !col-start-1 !col-end-3",
            confirmButton:
                "inline-flex w-full h-14 justify-center rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto",
            cancelButton:
                "mt-3 inline-flex w-full h-14 justify-center rounded-sm bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto",
        },
    });
};

const App = {
    data() {
        return {
            showHome: false,
            showCreateForm: false,
            showStudentsList: false,
            newStudent: {
                name: "",
                firstname: "",
                birthdate: "",
                scholarLevel: "",
            },
            students: [],
        };
    },

    mounted() {
        this.changeNavigationState("home");
        this.fetchStudents();
    },

    methods: {
        goToHome() {
            this.changeNavigationState("home");
        },
        goToCreateForm() {
            this.changeNavigationState("create");
        },
        goToStudentsList() {
            this.changeNavigationState("list");
        },

        changeNavigationState(destination) {
            this.showHome = false;
            this.showCreateForm = false;
            this.showStudentsList = false;

            switch (destination) {
                case "home":
                    this.showHome = true;
                    break;
                case "create":
                    this.showCreateForm = true;
                    break;
                case "list":
                    this.showStudentsList = true;
                    break;

                default:
                    this.showHome = true;
                    break;
            }
        },

        resetForm() {
            this.newStudent = {
                name: "",
                firstname: "",
                birthdate: "",
                scholarLevel: "",
            };
        },

        cancelEditAndGoToStudentsList() {
            this.resetForm();
            this.goToStudentsList();
        },

        submitStudent() {
            if (!checkIfEmptyValue(this.newStudent)) {
                // Update existing student
                if (this.newStudent.id) {
                    updateStudent(this.newStudent);
                    this.fetchStudents();
                    this.resetForm();
                    this.showCreateForm = false;
                    this.showStudentsList = true;
                    showSuccessMessage(
                        "Success !",
                        "The student has been updated."
                    );
                } else {
                    // Create new student
                    if (
                        !checkIfStudentExist(
                            this.newStudent.name,
                            this.newStudent.firstname
                        )
                    ) {
                        addStudent(this.newStudent);
                        this.$refs.studentAdd.reset();
                        this.resetForm();
                        this.fetchStudents();
                        this.showCreateForm = false;
                        this.showStudentsList = true;
                        showSuccessMessage(
                            "Success !",
                            "The student has been created."
                        );
                    } else {
                        showErrorMessage(
                            "Error !",
                            "This student already exist !"
                        );
                    }
                }
            } else {
                showErrorMessage("Error !", "Please fill all inputs !");
            }
        },

        fetchStudents() {
            this.students = JSON.parse(localStorage.getItem(STUDENTDB)) || [];
        },

        editStudent(student) {
            this.originalStudent = { ...student };
            this.newStudent = { ...student };
            // spread operator `...` to create copy of student object passed in param
            this.showCreateForm = true;
            this.showStudentsList = false;
        },

        removeStudent(student) {
            deleteStudent(student);
            this.fetchStudents();
            showSuccessMessage("Success !", "The student has been deleted.");
        },
    },
};

Vue.createApp(App).mount("#app");
