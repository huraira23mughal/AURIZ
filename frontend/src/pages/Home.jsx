import { useEffect } from "react";
import axios from "../api/axios";

function Home() {

    useEffect(() => {
        axios.get("/")
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <h1> AURIZ </h1>
    );
}

export default Home;