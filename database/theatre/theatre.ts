import axios from "axios"
import { apiUrl } from "../firebase"

const fl_id = "nLay31Us53WiSCfpKpyA";

// GET all theatre projects
export const getAllTheatre = async () => {
    await axios.get(`${apiUrl}/databases/(default)/documents/documents/fl_schemas/${fl_id}`)
}