import { auth } from '../firebase';

export default function Home() {
    const logOut = () => {
        auth.signOut();
    }
    return (
        <div>
            Home
            <button onClick={logOut}>Logout</button>
        </div>
    );
}

