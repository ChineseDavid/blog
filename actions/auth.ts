'use server';

import * as auth from "@/auth";
export async function signIn(redirectTo?: string) {
  return auth.signIn('github', {
    redirectTo,
  });
}

export async function signInGitee(redirectTo?: string) {
  return auth.signIn('gitee', {
    redirectTo,
  });
}

export async function signOut() {
  return auth.signOut({
    redirectTo: '/',
  })
}