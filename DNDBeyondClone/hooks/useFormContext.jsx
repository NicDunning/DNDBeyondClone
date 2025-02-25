import { useContext } from "react";
import FormContext from "../components/form_context";

const useFormContext = () => {
    return useContext(FormContext)
}

export default useFormContext