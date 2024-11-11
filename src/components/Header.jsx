"use client";
import Link from "next/link";


const Header = () => {
    return ( <header className="flex justify-between p-2 bg-cyan-500">
        <nav>
            <ul className="flex gap-4 flex-col  m-2 md:flex-row">
                <li>
                    <Link href="">Home</Link>
                </li>
                <li>
                    <Link href="">Products</Link>
                </li>
            </ul>
        </nav>
    </header> );
}
 
export default Header;