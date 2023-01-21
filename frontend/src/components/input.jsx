import React, { useState, useEffect, useRef } from "react";

function InputRangeComponent({
    className,
    hidden,
    min,
    max,
    step,
    defaultValue,
    value,
    disabled,
    onChange
}) {
    const ref = useRef();

    useEffect(() => {
        changeInputWidth();
    }, []);

    useEffect(() => {
        changeInputWidth();
    }, [defaultValue, value]);

    const changeInputWidth = (event) => {
        const target = ref.current;
        // console.log(event)
        const value = (target.value - target.min) / (target.max - target.min) * 100
        target.style.background = 'linear-gradient(to right, #4b7c87ec 0%, #4b7c87ec ' + value + '%, #ebebeb ' + value + '%)'
    };

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
                changeInputWidth(event);
                typeof onChange === "function" && onChange(event);
            }}
            disabled={disabled}
        />
    )
}

export default InputRangeComponent;
