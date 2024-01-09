import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className=" w-full px-2 sm:px-0 sm:w-[400px]">
                <Header />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}