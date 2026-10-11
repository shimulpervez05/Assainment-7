'use client';
import { Toaster } from 'react-hot-toast';
export default function Providers({children}) { return <>{children}<Toaster position="top-center" toastOptions={{duration:3000,style:{borderRadius:'14px',fontFamily:'inherit'}}}/></>; }
