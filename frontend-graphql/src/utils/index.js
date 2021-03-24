import moment from 'moment'
moment.locale('es')



export const onlyLetters = dato => {
    const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
    if (validar.test(dato) === false && dato !== '' && dato !== undefined && dato !== null) {
        return true
    } else return false
}
