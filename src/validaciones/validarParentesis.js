export const validarParentesis = (cadena) => {
    let stack = []; //Uso de pila para paréntesis de apertura
    let i;
    if(cadena == ''){
        return false;
    }else{
        for(i=0; i < cadena.length; i++){
            if(cadena[i] == '(' || cadena[i] == ')'){
                if(cadena[i] == '('){
                    stack.push(cadena[i]);
                }else{
                    if(cadena[i] == ')' && stack.slice(-1) != '('){
                        return false;
                    }else{
                        stack.pop();
                    }
                }
            }else{
                return false;
            }
        }
    }

    if(stack.length > 0){
        return false;
    }else{
        return true;
    }
}