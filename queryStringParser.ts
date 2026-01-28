function parseQueryString(req:any , res:any, next:any){
    req["parsedQuery"] = {}
    if(req["query"] && typeof req["query"] == `object`){
        for(const key in req["query"]){
            const value = req["query"][key];
            req["parsedQuery"][key] = parseValue(value);
        }
    }
    next();
}

function parseValue(value:any){
    if(value == "true"){
        return true;
    }
    if(value == "false"){
        return false;
    }

    const num = Number(value);
    if(!isNaN(num)){ //se è un numero validp
        return num;
    }

    //tipeof NaN restituisce number
    // if(typeof num == "number"){
    //     return num;
    // }

    if(typeof value == "string" && (value.startsWith("{") || value.startsWith("["))){
        try{
            return JSON.parse(value);
        }
        catch(error){
            return value;
        }
    }
    //se è una stringa
    return value;
}

export default parseQueryString;