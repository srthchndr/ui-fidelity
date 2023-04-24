import React from "react";

export default interface DialogProps {
    children: React.ReactNode,
    handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown")=> void,
    open: boolean,
    title: string
}