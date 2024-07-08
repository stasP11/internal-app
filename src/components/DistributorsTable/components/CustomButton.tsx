import { Button } from "@mui/material";
import { ComponentType } from "react";

export interface CustomButtonProps {
    buttonText: string;
    handleClick: () => void;
    IconComponent: ComponentType; // or React.ElementType
}

export function CustomButton(props: CustomButtonProps) {
    const { buttonText, handleClick, IconComponent } = props;
    return (
        <Button onClick={handleClick} startIcon={<IconComponent/>}>{buttonText}</Button>
    );
};