"use client"

import React, { createContext, useContext, useState, useMemo } from "react";

export type User = { id: string; name: string; email: string; createdAt: string }

//tip za stanje (podatke) koje zelimo da delimo
type AuthState = { status: "loading"; user: null }
    | { status: "unauthenticated"; user: null }
    | { status: "authenticated"; user: User };

//Context Shape - tip podatka koji prosledjujemo React Context hook-u
// sadrzi stanje plus funkcije AuthProvider-a
type Ctx = AuthState;

//pogledati React useContext hook
const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({ status: "loading", user: null })

    //azuriramo memorisanu vrednost kada se neki dependency promeni
    const value = useMemo<Ctx>(() => ({ ...state }), [state])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//hook koji pozivamo kad nam treba AuthProvider ili neki njegov deo
export function useAuth() {
    const ctx = useContext(AuthContext);
    return ctx;
}
