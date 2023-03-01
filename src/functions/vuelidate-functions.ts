import { verifyEmail } from "@/services/UsersService";

import { helpers } from "@vuelidate/validators";

export const emailValidation =  (value:string) => !helpers.req(value) || value.includes('cool')

/*export const emailValidation = async (value:string) => {
    console.log()
    if (value) {
        const res = await verifyEmail(value)
        console.log(res.data)
        return res.data ? true: false
    } else {
        return false
    }
}*/

export const mustBeCool = (value:any) => !helpers.req(value) || value.includes('cool')
