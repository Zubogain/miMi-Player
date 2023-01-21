import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function BackComponent({ to }) {
    const navigate = useNavigate();

    const back = () => {
        navigate(to);
    }

    return (
        <button className="btn btn__normal" onClick={back}>Cancel</button>
    )
}

export default BackComponent;
