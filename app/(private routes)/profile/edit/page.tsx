'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import css from './EditProfilePage.module.css';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = (formData.get('username') as string).trim();

    if (!username) {
      setError('Username cannot be empty');
      return;
    }

    setError('');
    setIsSaving(true);

    try {
      const updatedUser = await updateMe({ username });

      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.message ??
            error.response?.data?.error ??
            error.message
        );
      } else {
        setError('Failed to update profile');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => router.push('/profile');

  if (!user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
