import { getDate } from "../helpers/formatDate"
import { md5 } from 'js-md5';

const PASSWORD: string = "Valantis"
const TIMESTAMP: string = getDate() // format date: '20240302'

const KEY_ACCESS = md5(`${PASSWORD}_${TIMESTAMP}`)


export { KEY_ACCESS }