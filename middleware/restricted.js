export default async function ({store, redirect}) {
  if (store.state.auth.token?.startsWith('Bearer')) {
    if (Object.keys(store.state.auth.userData).length > 1) {
      return true;
    }

    try {
      await store.dispatch('auth/verify');
      return true;
    } catch {
      return redirect('/');
    }
  }

  return redirect('/');
}
