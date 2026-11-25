import { Gamepad2, Sparkles } from "lucide-react";
import AuthForm from "@/components/auth-form";

export default function Register() {
  return <main className="shell">
    <header className="topbar glass"><a className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></a><a className="button soft" href="/">Back home</a></header>
    <section className="auth-card glass">
      <span className="empty-icon"><Sparkles size={27}/></span>
      <label className="page-kicker">MAKE IT YOUR HIVE</label>
      <h1>Save your spot.</h1>
      <p>Create a free account to save your favourite games and keep track of what you've been playing. You can still play without signing in.</p>
      <AuthForm mode="register"/>
      <p style={{textAlign:"center",marginTop:18}}>Already have an account? <a href="/login" style={{fontWeight:700,color:"#247fbd"}}>Sign in</a></p>
    </section>
  </main>;
}