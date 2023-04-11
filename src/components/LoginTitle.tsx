import "../styles/components/LoginTitle.css";

interface ILoginTitle {
    text: string
};

const LoginTitle: React.FC<ILoginTitle> = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

export default LoginTitle