"use client"
//import { page } from "./ClientDashboard"
import { Login } from "./Login"
// import { Login } from "./Login"

export const App = () => {
    return(
        <div  style={{ backgroundImage: 'url(/img/fundo_form.jpg)'}} className="bg[url(public/img/fundo_form.jpg)]  h-full flex items-center justify-center">
            <Login/>
        </div>
    )
}   