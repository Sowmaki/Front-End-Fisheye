
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

async function getPhotographersFactory() {

  try {
    const response = await fetch('data/photographersMedia.json')
    if (!response.ok) {
      throw new Error('could not fetch data')
    }

    const mediaData = await response.json()
    return mediaData

  }
  catch (error) {
    console.error(error);
  }

}

getPhotographersFactory()