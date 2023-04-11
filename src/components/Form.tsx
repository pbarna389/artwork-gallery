import { IChildren } from "../@types/artwork";

import "../styles/components/Form.css"

const Form: React.FC<IChildren> = ({ children }) => {
    return (
        <div className="form-wrapper">
            {children}
        </div>
    )
}

export default Form