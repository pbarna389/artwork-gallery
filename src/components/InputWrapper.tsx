import { IChildren } from "../@types/artwork";

import "../styles/components/InputWrapper.css"

const InputWrapper: React.FC<IChildren> = ({ children }) => {
    return (
        <div className="inputWrapper">
            {children}
        </div>
    )
}

export default InputWrapper