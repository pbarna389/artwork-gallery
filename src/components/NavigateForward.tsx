import { IconContext } from "react-icons";
import { MdArrowForward } from "react-icons/md";

const NavigateForward: React.FC = (): JSX.Element => {
    return (
        <IconContext.Provider value={{ className: "icon-prov" }}>
            <MdArrowForward />
        </IconContext.Provider>
    )
}

export default NavigateForward