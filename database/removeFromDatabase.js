export async function removeItem(path){
  await fetch(path, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
  })
}

