'use server'

export const onFollow = async (id: string) => {
    try {
        console.log('I am the same as the api call', id)
    } catch (e) {
        throw new Error('Internal error')
    }
}