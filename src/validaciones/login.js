export const validacion = (error) => {
    switch(error.code){
        case 'auth/missing-email':
            // console.log(error);
            return 'Campos requeridos vacíos.';
        break;
        case 'auth/invalid-email':
            return 'Favor de introducir un correo válido.';
        break;
        case 'auth/user-not-found':
            return 'Usuario no existente y/o contraseña incorrecta.';
        break;
        case 'auth/invalid-password':
            return 'Usuario no existente y/o contraseña incorrecta.';
        break;
        default:
            console.log(error.code);
        break;
    }
    // console.log(error.code);
}