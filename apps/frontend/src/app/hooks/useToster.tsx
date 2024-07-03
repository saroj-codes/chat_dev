import {toast} from "sonner"

export const useToster = () => {
    const notify=(message:string,type:"success"|"error")=>{
        if(type==="error"){
            toast.error(message)
        }else{

            toast.success(message)
        }
    }

  return {notify}
}
