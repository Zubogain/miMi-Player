import React, { useState, useEffect, useRef, FC, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> { };

const InputRangeComponent = ({
    className,
    hidden,
    min,
    max,
    step,
    defaultValue,
    value,
    disabled,
    onChange
}: IInputProps) => {
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        changeInputWidth();
    }, []);

    useEffect(() => {
        changeInputWidth();
    }, [defaultValue, value]);


    const changeInputWidth = () => {
        const target = ref.current;
        if (target) {
            // console.log(event)
            const value = (parseFloat(target.value) - parseFloat(target.min)) / (parseFloat(target.max) - parseFloat(target.min)) * 100
            target.style.background = 'linear-gradient(to right, #4b7c87ec 0%, #4b7c87ec ' + value + '%, #ebebeb ' + value + '%)'
        }
    };

    // const changeInputWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = event.target;

    //     const value = (parseFloat(target.value) - parseFloat(target.min)) / (parseFloat(target.max) - parseFloat(target.min)) * 100
    //     target.style.background = 'linear-gradient(to right, #4b7c87ec 0%, #4b7c87ec ' + value + '%, #ebebeb ' + value + '%)'
    // };

    return (
        <input
            ref={ref}
            className={className}
            hidden={hidden}
            type="range"
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            value={value}
            onChange={(event) => {
                changeInputWidth();
                typeof onChange === "function" && onChange(event);
            }}
            disabled={disabled}
        />
    )
}

export default InputRangeComponent;
