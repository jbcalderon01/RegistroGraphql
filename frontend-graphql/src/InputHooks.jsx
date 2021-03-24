import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { PColor, SFColor, SFVColor } from '../../assets/colors'
import { IconWarning } from '../../assets/icons'
import { isEmail, isNull, onlyLetters, rangeLength } from '../Utils'

const InputHooks = ({ reference, title, disabled, onBlur, fontSize, width, minWidth, padding, radius, labelColor, bgColor,
    type, value, onChange, name, required, numeric, letters, range, email, error }) => {

    // Declarando el estado
    const [errors, setError] = useState(error)
    const [message, setMessage] = useState('El campo no debe estar vacío')

    // Función para activar el error
    const errorFunc = (e, v, m) => {
        setError(v)
        v && setMessage(m)
        onChange(e, v)
    }
    useEffect(() => {
        setError(error)
    }, [error])
    /**
     * @description Función que para validar los campos de texto por el método onChange
     * @version 0.0.1
     * @param {object} e evento del metodo change
     * @return {boolean} devuleve true o false si la validación es correcta o incorrecta
     *
    */
    const validations = e => {

        // Valida que el campo no sea nulo
        if (required) {
            if (isNull(e.target.value)) return errorFunc(e, true, 'El campo no debe estar vacío')
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea tipo numérico
        if (numeric) {
            if (isNaN(e.target.value)) return errorFunc(e, true, 'El campo debe ser numérico')
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea solo letras
        if (letters) {
            if (onlyLetters(e.target.value)) return errorFunc(e, true, 'El campo debe contener solo letras')
            else errorFunc(e, false, '')
        }
        // Valida que el campo esté en el rango correcto
        if (range) {
            if (rangeLength(e.target.value, range.min, range.max)) return errorFunc(e, true, `El rango de carácteres es de ${ range.min } a ${ range.max }`)
            else errorFunc(e, false, '')
        }
        // Valida si el campo tiene un formato de email correcto
        if (email) {
            if (isEmail(e.target.value)) return errorFunc(e, true, 'El formato de email no es válido')
            else errorFunc(e, false, '')
        }
    }

    return (
        <BoxInput width={width} padding={padding} minWidth={minWidth}>
            <InputV type={type} ref={reference} value={value || ''} onChange={validations} data-required={required} name={name} disabled={disabled} onBlur={onBlur}
                size={fontSize} radius={radius} error={errors} autoComplete={type === 'password' ? 'current-password' : 'true'} bgColor={bgColor} />
            <LabelInput value={value} type={type} labelColor={labelColor} error={error}>{title}</LabelInput>
            {errors && <Tooltip>{message}</Tooltip>}
            <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} />
        </BoxInput>
    )
}

// Estilos
const BoxInput = styled.div`
    position: relative;
    padding: ${ ({ padding }) => padding ? padding : '10px 5px' };
    width: ${ ({ width }) => width ? width : '100%' };
`
const Tooltip = styled.div`
    position: absolute;
    display: block;
    right: 5px;
    bottom: 100%;
    border: 1px solid ${ PColor };
    background-color: ${ PColor };
    padding: 0 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 11px;
    color: #ffffff;
    &::after, &::before {
        top: 100%;
        left: 90%;
        border: solid transparent;
        content: "";
        position: absolute;
        pointer-events: none;
    }
    &::after {
        border-top-color: ${ PColor };
        border-width: 4px;
    }
    &::before {
        border-top-color: ${ PColor };
        border-width: 5px;
        margin-left: -1px;
    }
`
const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value, type }) => (value || type === 'date') ? '11px' : '13px' };
    top: ${ ({ value, type }) => (value || type === 'date') ? '-5px' : '18px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value, labelColor, error }) => value ? (labelColor ? labelColor : SFColor) : (error ? '#fff' : SFVColor) };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`
const InputV = styled.input`
    padding: 10px;
    color: ${ props => (props.type === 'date' && !props.value) ? SFVColor : SFColor };
    outline: 0;
    border: 1px solid ${ SFVColor };
    font-weight: 600;
    font-size: ${ ({ size }) => size ? size : '13px' };
    width: ${ ({ width }) => width ? width : '100%' };
    border-radius: ${ ({ radius }) => radius ? radius : '8px' };
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    ${ ({ minWidth }) => minWidth && css`min-width: ${ minWidth };` }
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` }
    &:focus ~ ${ LabelInput } {
        top: -5px;
        font-size: 11px;
        color: ${ SFVColor };
    }
    &:focus { border: 1px solid ${ PColor }; }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${ Tooltip } { display: block; }
    ${ ({ error }) => error && css`background-color: #FBCACA;` }
`

InputHooks.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    minLenght: PropTypes.number,
    maxLenght: PropTypes.number,
    email: PropTypes.bool,
    numeric: PropTypes.bool,
    letters: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    dataIgnore: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    radius: PropTypes.string,
    range: PropTypes.object,
    fontSize: PropTypes.string,
    reference: PropTypes.object
}

export default InputHooks