import { escape } from "lodash"
import axios from "axios"
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { unlink } from "fs-extra";
import jwt, { decode } from "jsonwebtoken";
import * as cheerio from "cheerio";
import FormData from "form-data";
import * as pdfjs from "pdfjs-dist/es5/build/pdf"

export const testPdf = async (req: any, res: any) => {
    
    const route = join(__dirname, `../public/pdf/uploads/boleta.pdf`)

    async function getContent(src: string) {
        const doc = await pdfjs.getDocument({url: src, standardFontDataUrl: join(__dirname, '../../node_modules/pdfjs-dist/standard_fonts/')}).promise
        const page = await doc.getPage(1)
        return await page.getTextContent()
    }
    async function getItems(src) {
        const content = await getContent(src)
        return content.items.map((item) => (item as any).str)
    }

    const items = await getItems(route)
    let raw = [] as any
    let textAll = ""

    for (let i=0; i < items.length; i++) {
        textAll += items[i]
    }
    
    raw = textAll.trim().replace(/PG/g, "").split(" ")

    const filter = raw.filter(item => item != "" && item != " " && item != "Calif" && item != "PG" && item != "F" && item != "Etapa"&& item != "0" && item != "1" && item != "2" && item != "3" 
    && item != "4" && item != "5" && item != "6" && item != "Prom." && item != "Etapas"  && item != "Semestral" && item != "Final" && item != "M" && item != "A" 
    && item != "T" && item != "E" && item != "R" && item != "I" && item != "A" && item != "TF" && item != "DEBE")

    const regexText = /^[a-zA-Z]+$/
    const regexNum = /^[0-9]*$/
    const regexNumOpc = /[0-9-]/

    let objectData = {}

    let name = []
    let feesIndex

    let firstName:string 
    let secondName:string
    let lastNameF:string
    let lastNameS:string

    for (let i=0; i < 5; i++) {
        if (regexText.test(filter[i])) name.push(filter[i].toLowerCase())
        else if (regexNum.test(filter[i])) feesIndex = i
    }

    if (name.length == 4) {
        lastNameF = name[0]
        lastNameS = name[1]
        firstName = name[2]
        secondName = name[3]
    } else if (name.length == 3) {
        lastNameF = name[0]
        lastNameS = name[1]
        firstName = name[2]
        secondName = undefined
    }

    objectData["firstName"] = firstName
    objectData["secondName"] = secondName
    objectData["lastNameF"] = lastNameF
    objectData["lastNameS"] = lastNameS
    //objectData["fees"] = filter[1]
    //objectData["password"] = password

    const subjects = filter.slice(feesIndex+3, filter.length)

    let subjectName
    let indexScore = 0
    let lastItem
    let index = 0

    let objectSubjects = {}
    let objectScore = {}

    for (let i=0; i < subjects.length; i++) {
        if (i == 0) {
            subjectName = subjects[i]
            objectScore[0] = subjectName
        } else if(i == subjects.length) {
            console.log(objectScore)
            objectSubjects[index] = objectScore
        } else {
            if (regexNumOpc.test(lastItem) && regexNumOpc.test(subjects[i])) {
                indexScore++
                if (indexScore < 15) objectScore[indexScore] = subjects[i]
                
            } else if (regexNumOpc.test(lastItem) && !regexNumOpc.test(subjects[i])) {
                objectScore[0] = subjectName
                subjectName = subjects[i]
                objectSubjects[index] = objectScore
                index++
                objectScore = {}
                indexScore = 0
            } else if (!regexNumOpc.test(lastItem) && regexNumOpc.test(subjects[i])) {
                indexScore++
                objectScore[indexScore] = subjects[i]
            } else if (!regexNumOpc.test(lastItem) && !regexNumOpc.test(subjects[i])) {
                subjectName = subjectName +" "+ subjects[i]
            }
        } 

        lastItem = subjects[i]
    } 
    objectData["subjects"] = objectSubjects  


    res.send(objectData)
}

export const postLoginScores = async (req: any, res: any) => {

    const { fees, password } = req.body

    if (!fees || !password ) return res.send({error: "Invalid data"})

    let formDataScore = new FormData()
    formDataScore.append("nombresss", fees)
    formDataScore.append("pass", password)
    formDataScore.append("accion", "Buscar")

    const namePdf = uuidv4()
    let raw = new Array
    const route = join(__dirname, process.env.STATE == "production" ? `../../public/pdf/uploads/${namePdf}.pdf` : `../public/pdf/uploads/${namePdf}.pdf`)
    let textAll = ""

    async function postData(url: string) {
        const resAxios = await axios.post(url, formDataScore, { responseType: "stream" })
    
        await writeFile(route, resAxios.data)
    
        async function getContent(src: string) {
            const doc = await pdfjs.getDocument({url: src, standardFontDataUrl: join(__dirname, '../../node_modules/pdfjs-dist/standard_fonts/')}).promise
            const page = await doc.getPage(1)
            return await page.getTextContent()
        }
        async function getItems(src: string) {
            const content = await getContent(src)
    
            return content.items.map((item) => (item as any).str)
        }
        const items = await getItems(route)

        for (let i=0; i < items.length; i++) {
            textAll += items[i]
        }

        raw = textAll.trim().replace(/PG/g, "").split(" ")
        unlink(route)
    }

    await postData("http://67.225.220.160/~prepaco1/boletapdf/rep.php")

    if (textAll.length == 0) {
        await postData("http://67.225.220.160/~prepaco1/boletapdf/reptv.php")
        if (textAll.length == 0) {
            res.send({error: "Datos inválidos"})
            return
        }
    }

    // Analyze the pdf 

    const filter = raw.filter(item => item != "" && item != " " && item != "Calif" && item != "PG" && item != "F" && item != "Etapa"&& item != "0" && item != "1" && item != "2" && item != "3" 
    && item != "4" && item != "5" && item != "6" && item != "Prom." && item != "Etapas"  && item != "Semestral" && item != "Final" && item != "M" && item != "A" 
    && item != "T" && item != "E" && item != "R" && item != "I" && item != "A" && item != "TF" && item != "DEBE")

    const regexText = /^[a-zA-Z]+$/
    const regexNum = /^[0-9]*$/
    const regexNumOpc = /[0-9-]/

    let objectData = {}

    let name = []
    let feesIndex

    let firstName:string 
    let secondName:string
    let lastNameF:string
    let lastNameS:string

    for (let i=0; i < 5; i++) {
        if (regexText.test(filter[i])) name.push(filter[i].toLowerCase())
        else if (regexNum.test(filter[i])) feesIndex = i
    }

    if (name.length == 4) {
        lastNameF = name[0]
        lastNameS = name[1]
        firstName = name[2]
        secondName = name[3]
    } else if (name.length == 3) {
        lastNameF = name[0]
        lastNameS = name[1]
        firstName = name[2]
        secondName = undefined
    }

    objectData["firstName"] = firstName
    objectData["secondName"] = secondName
    objectData["lastNameF"] = lastNameF
    objectData["lastNameS"] = lastNameS
    objectData["fees"] = fees
    objectData["password"] = password

    const subjects = filter.slice(feesIndex+3, filter.length)

    let subjectName
    let indexScore = 0
    let lastItem
    let index = 0

    let objectSubjects = {}
    let objectScore = {}

    for (let i=0; i < subjects.length; i++) {
        if (i == 0) {
            subjectName = subjects[i]
            objectScore[0] = subjectName
        } else if(i == subjects.length) {
            console.log(objectScore)
            objectSubjects[index] = objectScore
        } else {
            if (regexNumOpc.test(lastItem) && regexNumOpc.test(subjects[i])) {
                indexScore++
                if (indexScore < 15) objectScore[indexScore] = subjects[i]
                
            } else if (regexNumOpc.test(lastItem) && !regexNumOpc.test(subjects[i])) {
                objectScore[0] = subjectName
                subjectName = subjects[i]
                objectSubjects[index] = objectScore
                index++
                objectScore = {}
                indexScore = 0
            } else if (!regexNumOpc.test(lastItem) && regexNumOpc.test(subjects[i])) {
                indexScore++
                objectScore[indexScore] = subjects[i]
            } else if (!regexNumOpc.test(lastItem) && !regexNumOpc.test(subjects[i])) {
                subjectName = subjectName +" "+ subjects[i]
            }
        } 

        lastItem = subjects[i]
    } 
    objectData["subjects"] = objectSubjects  

    // Search the account status

    let formDataStatus = new FormData()
    formDataStatus.append("matri", fees)
    formDataStatus.append("clave", password)

    const resAxios = await axios.post("http://67.225.220.160/~prepaco1/cuotas/leer.php", formDataStatus, {responseType: "document"})
    const $ = cheerio.load(resAxios.data)
    
    let texts = []

    $("tbody tr td").each((i, el) => {
        const text = $(el).text().trim().replace("January","01").replace("February","02").replace("March","03").replace("April","04").replace("May","05").replace("June","06")
        .replace("July","07").replace("August","08").replace("September","09").replace("October","10").replace("November","11").replace("December","12")
        let textSpaces = text
        if ($(el).text() != "No ha pagado") {
            textSpaces = text.replace(/\s+/g,"/").trim()
        }
        texts.push(textSpaces)
    }) 

    let objectTableStatus = {}
    let objectLine = {}

    let iObj = 0
    let iData = 0
    
    texts = texts.reverse()

    texts.forEach(text => {
        if (iObj >= 5)  {
            iObj = 0
            objectTableStatus[iData] = objectLine
            objectLine = {}
            iData++
        }
        objectLine[iObj] = text
        iObj++
    });

    objectTableStatus[iData] = objectLine

    const footerText = $("address").text()

    const footerDivided = footerText.split("\n")
    const ActuText = footerDivided[2].replace("Actualizaci�n:", "").trim()

    objectData["actualizationStatus"] = ActuText
    objectData["status"] = objectTableStatus 

    const dataStudent = jwt.sign({
        student: objectData
    }, `${process.env.SECRET}`, {
        expiresIn:"30d"
    })

    req.session.dataStudent = dataStudent 

    res.send(objectData)
}

export const getDataStudent = async (req:any, res:any) => {
    const { dataStudent } = req.session
    if (!dataStudent) res.send({error: "Primero tiene que iniciar sesión"})

    const decoded = (<any>jwt.verify(dataStudent, `${process.env.SECRET}`))

    res.send(decoded)
}

export const postDownloadScores = async (req:any, res:any) => {
    const { dataStudent } = req.session
    if (!dataStudent) {
        res.send(false)
        return
    }

    const { fees, password } = req.body

    let formDataScore = new FormData()
    formDataScore.append("nombresss", fees)
    formDataScore.append("pass", password)
    formDataScore.append("accion", "Buscar")

    const resAxios = await axios.post("http://67.225.220.160/~prepaco1/boletapdf/rep.php", formDataScore, { responseType: "blob" })
    //await writeFile(join(__dirname, `../public/pdf/uploads/${namePdf}.pdf`), resAxios.data)
    //unlink(join(__dirname, `../public/pdf/uploads/${namePdf}.pdf`))
    //console.log(resAxios.data)
    res.send(true)
    
}

export const deleteDataStudent = async (req:any, res:any) => {
    const { dataStudent } = req.session
    if (!dataStudent) {
        res.send(false)
        return
    }

    delete req.session.dataStudent

    res.send(true)
}
