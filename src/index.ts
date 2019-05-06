import { getItem, setItem, removeItem, clear} from "./cache";


setItem("name","thename")

console.log(getItem('name'));

removeItem("name")

clear();