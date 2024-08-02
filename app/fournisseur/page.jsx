import Link from "next/link"

import { RegisterForm } from "./form";

export default function Fournisseur() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Ouvrir un nouveau compte
                </h2>
                <p className=" text-center text-sm text-gray-500">
                    Vous êtes un client ?{' '}
                    <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Rejoindre par ici
                    </Link>
                </p>
                
                <RegisterForm />
                
            </div>
        </div>
    )
}