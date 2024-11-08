
async function getPhotographers() {

  try {
    const response = await fetch('data/photographers.json')
    if (!response.ok) {
      throw new Error('could not fetch data')
    }

    const data = await response.json()
    return data

  }
  catch (error) {
    console.error(error);
  }

}

async function getPhotographersMedia() {

  try {
    const response = await fetch('data/photographersMedia.json')
    if (!response.ok) {
      throw new Error('could not fetch data')
    }

    const data = await response.json()
    return data

  }
  catch (error) {
    console.error(error);
  }

}