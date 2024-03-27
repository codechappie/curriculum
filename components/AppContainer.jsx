import React from 'react'
import { Navbar } from './navbar'
import Link from 'next/link'

const AppContainer = ({ children, isNavbar = true, isFooter = true }) => {
    return (
        <div className={isNavbar ? `relative flex flex-col h-screen` : ''}>
            {isNavbar && <Navbar />}
            <main className={isNavbar ? `w-full flex-grow` : ''}>
                {children}

            </main>
            {isFooter && <footer className="w-full flex items-center justify-center py-3">
                <Link
                    className="flex items-center gap-1 text-current"
                    href="https://codechappie.com"
                    target="_blank"
                    title="codechappie.com"
                    alt="codechappie.com"
                >
                    <span className="text-sm">Made with love by</span>
                    <p className="text-primary text-sm">CodeChappie</p>
                </Link>
            </footer>}
        </div>
    )
}

export default AppContainer