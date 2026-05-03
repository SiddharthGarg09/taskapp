'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/tasks')
  }

  async function handleSignUp(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setError('Check your email to confirm signup!')
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  )
}
