import { ArrowRight, Gamepad2, LockKeyhole } from "lucide-react";
import AuthForm from "@/components/auth-form";

export default function Login() {
  return <main className="shell">
    <header className="topbar glass"><a className="brand" href="/"><span className="brand-mark"><Gamepad2 size={19}/></span><span>play<span>hive</span></span></a><a className="button soft" href="/">Back home</a></header>
    <section className="auth-card glass">
      <span className="empty-icon"><LockKeyhole size={27}/></span>
      <label className="page-kicker">WELCOME BACK</label>
      <h1>Good to see you.</h1>
      <p>Sign in to pick up where you left off and keep your favourites close.</p>
      <AuthForm mode="login"/>
      <p style={{textAlign:"center",marginTop:18}}>New to PlayHive? <a href="/register" style={{fontWeight:700,color:"#247fbd"}}>Create an account</a></p>
      <p style={{textAlign:"center",marginTop:12}}>Just here to play? <a href="/games" style={{fontWeight:700,color:"#247fbd"}}>Browse games</a></p>
    </section>
  </main>;
}