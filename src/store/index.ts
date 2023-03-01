import { Student } from "@/Interfaces/StudentData";
import { UserComplete } from "@/Interfaces/UserComplete";
import { createStore } from "vuex";

export default createStore({
    state: {
        connected: false,
        night: false,
        user: {} as UserComplete,
        userStudent: {} as Student,
        urlPdf: "http://localhost:3000/pdf",
        urlRedirect: "/",
        hideInterface: false,
        hideFooter: false,
        chartDataScores: {
            titles: [] as string[],
            scoresStudent: [] as string[],
            scoresGroup: [] as string[],
            totalStudent: 0,
            totalGroup: 0
        },
        chartDataScoresSubject: {
            scoresStudent: [] as string[],
            scoresGroup: [] as string[]
        },
        alertNavbar: {
            active: false,
            text: "Este es un mensaje de error",
            color: "alert-danger"
        },
        loadingDataDashboard: false,
        mainLoaderActive: true
    },
    getters: {
        night(state) {
            return state.night
        },
        connected(state) {
            return state.connected
        },
        urlRedirect(state) {
            return state.urlRedirect
        },
        loaderActive(state) {
            return state.mainLoaderActive
        },
        isOwner(state) {
            return state.user.owner
        },
        urlPdf(state) {
            return state.urlPdf
        },
        loginDataStudent(state) {
            const studentLogin = {
                fees: state.userStudent.fees,
                password: state.userStudent.password
            }
            return studentLogin
        },
        loadingDataDashboard(state) {
            return state.loadingDataDashboard
        },
        hideInterface(state) {
            return state.hideInterface
        },
        hideFooter(state) {
            return state.hideFooter
        },
        studentFees(state) {
            return state.userStudent.fees
        },
        studentConnected(state) {
            return state.userStudent.connected
        },
        studentSubjects(state) {
            return state.userStudent.subjects
        },
        studentFirstName(state) {
            let name = ""
            if (state.userStudent.firstName != "") name = state.userStudent.firstName[0].toUpperCase() + state.userStudent.firstName.substring(1)
            return name
        },
        studentLastNameF(state) {
            let name = ""
            if (state.userStudent.lastNameF != "") name = state.userStudent.lastNameF[0].toUpperCase() + state.userStudent.lastNameF.substring(1)
            return name
        },
        chartDataScoreStudent(state) {
            return state.chartDataScores.scoresStudent
        },
        chartDataScoreGroup(state) {
            return state.chartDataScores.scoresGroup
        },
        chartDataTotalStudent(state) {
            return state.chartDataScores.totalStudent
        },
        chartDataTotalGroup(state) {
            return state.chartDataScores.totalGroup
        },
        studentStatus(state) {
            return state.userStudent.status
        },
        studentStatusActualization(state) {
            return state.userStudent.actualizationStatus
        },
        stateAlertNavbar(state) {
            return state.alertNavbar.active
        },
        colorAlertNavbar(state) {
            return state.alertNavbar.color
        },
        textAlertNavbar(state) {
            return state.alertNavbar.text
        }
    },
    mutations: {
        ["CHANGE_LOADER"](state, status: boolean) {
            state.mainLoaderActive = status
        },
        ["SWITCH_CONNECTED"](state) {
            if (state.connected) {
                state.connected = false
            } else {
                state.connected = true
            }
        },
        ["LOGIN"](state, userData: UserComplete) {
            state.user = userData
            state.connected = true
        },
        ["LOGIN_STUDENT"](state, studentData: Student) {
            state.userStudent = studentData
            state.userStudent.connected = true
            // eslint-disable-next-line
            const subjects = state.userStudent.subjects as any
            state.chartDataScores.scoresStudent = []
            state.chartDataScores.scoresGroup = []
            state.chartDataScores.titles = []
            
            for (let i=0; i < 8; i++) {
                const subject = subjects[i] 
                state.chartDataScores.titles.push(subject[0])
                
                let j = 0
                do {
                    j++
                } while (subject[j]);
                
                if (j < 9) {
                    // eslint-disable-next-line
                    let arrayDestroyableStudent = [] as any
                    // eslint-disable-next-line
                    let arrayDestroyableGroup = [] as any
                    for (let y=0; y < j-2; y++) {
                        if (y != 0 && y) {
                            if (y % 2 != 0) {
                                arrayDestroyableStudent.push(subject[y])
                            } else {
                                arrayDestroyableGroup.push(subject[y])
                            }
                        }
                    }
                    state.chartDataScoresSubject.scoresStudent.push(arrayDestroyableStudent)
                    state.chartDataScoresSubject.scoresGroup.push(arrayDestroyableGroup)
                    
                    state.chartDataScores.scoresStudent.push(subject[j-2])
                    state.chartDataScores.scoresGroup.push(subject[j-1])
                } else {
                    // eslint-disable-next-line
                    const arrayDestroyableStudent = [] as any
                    // eslint-disable-next-line
                    const arrayDestroyableGroup = [] as any
                    for (let y=0; y < j; y++) {
                        if (y != 0) {
                            if (y % 2 != 0) {
                                arrayDestroyableStudent.push(subject[y])
                            } else {
                                arrayDestroyableGroup.push(subject[y])
                            }
                        }
                    }
                    state.chartDataScoresSubject.scoresStudent.push(arrayDestroyableStudent)
                    state.chartDataScoresSubject.scoresGroup.push(arrayDestroyableGroup)
                    
                    state.chartDataScores.scoresStudent.push(subject[9])
                    state.chartDataScores.scoresGroup.push(subject[10])
                }
            }
            let totalStudent = 0
            let totalGroup = 0
            for (let i=0; i < 8; i++) {
                totalStudent += parseInt(state.chartDataScores.scoresStudent[i])
                totalGroup += parseInt(state.chartDataScores.scoresGroup[i])
            }
            state.chartDataScores.totalStudent = parseFloat((totalStudent/8).toFixed(1))
            state.chartDataScores.totalGroup = parseFloat((totalGroup/8).toFixed(1))
        },
        ["LOGOUT_STUDENT"](state) {
            
            const clear:Student = {
                fees: "",
                actualizationStatus: "",
                connected: false,
                password: "",
                firstName: "",
                secondName: "",
                lastNameF: "",
                lastNameS: "",
                subjects: {},
                status: {}
            }

            state.chartDataScores.titles = []
            state.chartDataScores.scoresStudent = []
            state.chartDataScores.scoresGroup = []
            state.chartDataScores.totalStudent = 0
            state.chartDataScores.totalGroup = 0

            state.userStudent = clear
        },
        ["CHANGE_LOADING_DATA_DASHBOARD"](state, status: boolean) {
            state.loadingDataDashboard = status 
        },
        ["CHANGE_URLREDIRECT"](state, url: string) {
            state.urlRedirect = url 
        },
        ["SET_CONNECT"](state) {
            state.connected = true 
        },
        ["CHANGE_STATE_ALERT"](state, status: boolean) {
            state.alertNavbar.active = status 
        },
        ["CHANGE_COLOR_ALERT"](state, color: string) {
            state.alertNavbar.color = color 
        },
        ["CHANGE_TEXT_ALERT"](state, text: string) {
            state.alertNavbar.text = text 
        },
        ["SET_DISCONNECT"](state) {
            state.connected = false 
        },
        ["SWITCH_NIGHT"](state) {
            if (state.night) {
                localStorage.removeItem("night")
                document.body.classList.remove("night-bg")
                state.night = false
            } else {
                state.night = true
                localStorage.setItem("night", "existe")
                document.body.classList.add("night-bg")
            }
        },
        ["SET_NIGHT"](state) {
            state.night = true
        },
    },
    actions: {
        switchConnectedAction: (context) => {
            context.commit("SWITCH_CONNECTED")
        },
        switchNightAction: (context) => {
            context.commit("SWITCH_NIGHT")
        },
        LoginAction: (context, user: UserComplete) => {
            context.commit("LOGIN", user)
        },
        changeActiverLoader: (context, status: boolean) => {
            context.commit("CHANGE_LOADER", status)
        },
        LoginStudentAction: (context, student: Student) => {
            context.commit("LOGIN_STUDENT", student)
        },
        LogoutStudentAction: (context) => {
            context.commit("LOGOUT_STUDENT")
        },
        changeLoadingDataAction: (context, status: boolean) => {
            context.commit("CHANGE_LOADING_DATA_DASHBOARD", status)
        },
        changeUrlRedirect: (context, url: string) => {
            context.commit("CHANGE_URLREDIRECT", url)
        },
        setConnectedAction: (context) => {
            context.commit("SET_CONNECT")
        },
        changeStateAlert: (context, status: boolean) => {
            context.commit("CHANGE_STATE_ALERT", status)
        },
        changeColorAlert: (context, color: string) => {
            context.commit("CHANGE_COLOR_ALERT", color)
        },
        changeTextAlert: (context, text: string) => {
            context.commit("CHANGE_TEXT_ALERT", text)
        },
        setDisconnectedAction: (context) => {
            context.commit("SET_DISCONNECT")
        },
        setNightAction: (context) => {
            context.commit("SET_NIGHT")
        }
    },
    modules: {
    
    }
})