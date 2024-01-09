import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div>
                <Header/>
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}