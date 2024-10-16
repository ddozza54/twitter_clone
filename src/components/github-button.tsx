import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
background-color: white;
margin-top: 50px;
font-weight: 500;
width: 100%;
padding: 10px 20px;
border-radius: 50px;
border: 0;
display: flex;
gap: 5px;
align-items: center;
justify-content: center;
cursor: pointer;
`;

const Logo = styled.img`
height: 25px;
`;


export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            //두가지 옵션 둥 선택할 수 있다. 
            // await signInWithRedirect(auth, provider);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
    return <Button onClick={onClick}>
        <Logo src='/github-logo.svg' />
        Continue with Gihub
    </Button>
}