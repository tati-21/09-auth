'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import css from './SignUpPage.module.css';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError('');
    setIsLoading(true);

    try {
      const user = await register({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setUser(user);
      router.push('/profile');
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.message ??
            error.response?.data?.error ??
            error.message
        );
      } else {
        setError('Oops... some error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
